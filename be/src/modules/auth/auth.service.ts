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
      const token = await this._createToken(users);
      return { username: users.username, token };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  async login(user: User): Promise<any> {
    try {
      const findUser = await this.userService.findLogin(user);

      const token = await this._createToken(findUser);

      return { username: findUser.username, token };
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
      await this.userService.update(user._id, { refreshToken });
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
}
