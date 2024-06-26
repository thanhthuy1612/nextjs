import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETKEY,
    });
  }

  async validate({ email }) {
    try {
      const user = await this.authService.validateEmail(email);

      if (!user) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }

      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
