import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/models/UserScheme';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
//import { ExtractJwt } from 'passport-jwt';
//import fromAuthHeaderWithScheme = ExtractJwt.fromAuthHeaderWithScheme;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async register(user: User): Promise<ResponseData<any>> {
    try {
      user.password = await bcrypt.hash(user.password, 10);

      const userInDb = await this.userModel.find({
        email: user.email,
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
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  async login(user: User): Promise<ResponseData<any>> {
    try {
      const findUser = await this.userModel.find({
        email: user.email,
      });

      if (findUser.length === 0) {
        return new ResponseData<string>(
          'User not found',
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS,
        );
      }

      const is_equal = bcrypt.compareSync(user.password, findUser[0].password);

      if (!is_equal) {
        return new ResponseData<string>(
          'Invalid credentials',
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS,
        );
      }

      const token = await this._createToken(findUser[0]);

      return new ResponseData<any>(
        {
          user: findUser[0],
          token: token,
        },
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  // async handleVerifyToken(token) {
  //   try {
  //     const payload = this.jwtService.verify(token); // this.configService.get('SECRETKEY')
  //     return payload['email'];
  //   } catch (e) {
  //     throw new HttpException(
  //       {
  //         key: '',
  //         data: {},
  //         statusCode: HttpStatus.UNAUTHORIZED,
  //       },
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }
  // }

  // async validateUser(email) {
  //   const user = await this.userService.findByEmail(email);
  //   if (!user) {
  //     throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
  //   }
  //   return user;
  // }

  // async getAccess2FA(user) {
  //   return this._createToken(user, true);
  // }

  private async _createToken(
    user: User,
    isSecondFactorAuthenticated = false,
    refresh = true,
  ) {
    const accessToken = this.jwtService.sign({
      email: user.email,
      isSecondFactorAuthenticated,
    });

    if (refresh) {
      const refreshToken = this.jwtService.sign(
        { email: user.email },
        {
          secret: process.env.SECRETKEY_REFRESH,
          expiresIn: process.env.EXPIRESIN_REFRESH,
        },
      );
      await this.userModel.findByIdAndUpdate(user._id, {
        ...user,
        refreshToken: refreshToken,
      });
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

  // async refresh(refresh_token) {
  //   try {
  //     const payload = await this.jwtService.verify(refresh_token, {
  //       secret: process.env.SECRETKEY_REFRESH,
  //     });
  //     const user = await this.userService.getUserByRefresh(
  //       refresh_token,
  //       payload.email,
  //     );
  //     const token = await this._createToken(user, true, false);
  //     return {
  //       email: user.email,
  //       ...token,
  //     };
  //   } catch (e) {
  //     throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
  //   }
  // }

  // async logout(user: User) {
  //   await this.userService.update(
  //     { email: user.email },
  //     { refreshToken: null },
  //   );
  // }
}
