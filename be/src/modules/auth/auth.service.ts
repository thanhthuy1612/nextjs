import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { User } from 'src/models/UserScheme';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(user: User): Promise<ResponseData<any>> {
    try {
      user.password = await bcrypt.hash(user.password, 10);

      const userInDb = await this.userModel.find({
        username: user.username,
      });

      if (userInDb.length > 0) {
        return new ResponseData<string>(
          'User already exists',
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS,
        );
      }

      const users = await this.userModel.create(user);
      const token = await this._createToken(users);
      return new ResponseData<any>(
        {
          user: user,
          token: token,
        },
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log(error);
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  async login(user: User): Promise<ResponseData<any>> {
    try {
      const findUser = await this.userModel.find({
        username: user.username,
      });

      if (!findUser) {
        return new ResponseData<string>(
          'User not found',
          HttpStatus.ERROR,
          HttpMessage.ERROR,
        );
      }

      const is_equal = bcrypt.compareSync(user.password, findUser[0].password);

      if (!is_equal) {
        return new ResponseData<string>(
          'Invalid credentials',
          HttpStatus.ERROR,
          HttpMessage.ERROR,
        );
      }

      const token = await this._createToken(findUser[0]);

      return new ResponseData<any>(
        {
          user: findUser[0],
          token,
        },
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log(error);
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  private async _createToken(
    user: User,
    isSecondFactorAuthenticated = false,
    refresh = true,
  ) {
    const accessToken = await this.jwtService.signAsync({
      username: user.username,
      isSecondFactorAuthenticated,
    });

    if (refresh) {
      const refreshToken = await this.jwtService.signAsync(
        { username: user.username },
        {
          secret: process.env.SECRETKEY_REFRESH,
          expiresIn: process.env.EXPIRESIN_REFRESH,
        },
      );
      await this.userModel.findByIdAndUpdate(user._id, { refreshToken });
      return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,
        refreshToken,
        expiresInRefresh: process.env.EXPIRESIN_REFRESH,
      };
    } else {
      return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,
      };
    }
  }

  async validateUser(username: string): Promise<ResponseData<string | User>> {
    const findUser = await this.userModel.find({ username });
    if (!findUser) {
      return new ResponseData<string>(
        'User not found',
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
    return new ResponseData<any>(
      findUser[0],
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  async getAccess2FA(user: User) {
    return this._createToken(user, true);
  }

  async refresh(refresh_token: string): Promise<ResponseData<any>> {
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.SECRETKEY_REFRESH,
      });
      const findUser = await this.userModel.find({
        username: payload.username,
      });
      if (!findUser) {
        return new ResponseData<string>(
          'User not found',
          HttpStatus.ERROR,
          HttpMessage.ERROR,
        );
      }

      if (findUser[0].refreshToken !== refresh_token) {
        return new ResponseData<string>(
          'Invalid credentials',
          HttpStatus.ERROR,
          HttpMessage.ERROR,
        );
      }

      const token = await this._createToken(findUser[0], true, false);
      return new ResponseData<any>(
        {
          user: findUser[0],
          token,
        },
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log(error);
      return new ResponseData<string>(
        'Invalid token',
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  async logout(user: User): Promise<ResponseData<User>> {
    try {
      const findUser = await this.userModel.findOneAndUpdate(
        { username: user.username },
        {
          refreshToken: null,
        },
      );
      return new ResponseData<User>(
        findUser,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log(error);
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
}
