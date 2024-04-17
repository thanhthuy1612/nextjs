import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/UserScheme';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(user: User): Promise<any> {
    try {
      const users = await this.userService.create(user);

      if (typeof users === 'string') {
        return users;
      }
      const token = await this._createToken(users);
      return { username: users.username, ...token };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  async login(user: User): Promise<any> {
    try {
      const users = await this.userService.findLogin(user);

      if (typeof users === 'string') {
        return users;
      }

      const token = await this._createToken(users);

      return { username: users.username, ...token };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  private async _createToken(
    user: User,
    isSecondFactorAuthenticated = false,
    refresh = true,
  ) {
    const accessToken = await this.jwtService.signAsync(
      {
        username: user.username,
        isSecondFactorAuthenticated,
      },
      {
        secret: process.env.SECRETKEY,
        expiresIn: process.env.EXPIRESIN,
      },
    );

    if (refresh) {
      const refreshToken = await this.jwtService.signAsync(
        { username: user.username },
        {
          secret: process.env.SECRETKEY_REFRESH,
          expiresIn: process.env.EXPIRESIN_REFRESH,
        },
      );
      await this.userService.update(user._id, { refreshToken });
      return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,
        refreshToken,
      };
    } else {
      return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,
      };
    }
  }

  async validateUser(username: string): Promise<User> {
    return await this.userService.findByUserName(username);
  }

  async getAccess2FA(user: User) {
    return this._createToken(user, true);
  }

  async refresh(refresh_token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.SECRETKEY_REFRESH,
      });
      const user = await this.userService.findByUserName(payload.username);

      if (user.refreshToken !== refresh_token) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const token = await this._createToken(user, true, false);
      return { username: user.username, token };
    } catch (error) {
      console.log(error);
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async logout(user: User): Promise<User> {
    try {
      return await this.userService.findAndUpdateByUserName(user.username);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  async googleLogin(req): Promise<any> {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
