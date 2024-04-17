import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseData } from 'src/global/globalClass';
import { User } from 'src/models/UserScheme';
import { AuthGuardCustom } from './auth.guard';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body()
    user: User,
  ): Promise<ResponseData<any>> {
    return new ResponseData<User | string>(
      await this.authService.register(user),
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Post('login')
  async loginUser(
    @Body()
    user: User,
  ): Promise<ResponseData<any>> {
    return new ResponseData<User | string>(
      await this.authService.login(user),
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Post('refresh')
  async refresh(@Body() body: { refresh: string }): Promise<ResponseData<any>> {
    return new ResponseData<User>(
      await this.authService.refresh(body.refresh),
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @UseGuards(AuthGuardCustom)
  @Post('logout')
  async logout(
    @Body()
    user: User,
  ): Promise<ResponseData<any>> {
    return new ResponseData<User>(
      await this.authService.logout(user),
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Get('login')
  async login(
    @Body()
    user: User,
  ): Promise<ResponseData<any>> {
    return new ResponseData<User>(
      await this.authService.login(user),
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // async googleAuthRedirect(@Req() req): Promise<ResponseData<any>> {
  //   return new ResponseData<any>(
  //     await this.authService.googleLogin(req),
  //     HttpStatus.SUCCESS,
  //     HttpMessage.SUCCESS,
  //   );
  // }
}
