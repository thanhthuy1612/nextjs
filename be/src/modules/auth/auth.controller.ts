import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseData } from 'src/global/globalClass';
import { User } from 'src/models/UserScheme';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body()
    user: User,
  ): Promise<ResponseData<any>> {
    return this.authService.register(user);
  }

  @Post('login')
  async loginUser(
    @Body()
    user: User,
  ): Promise<ResponseData<any>> {
    return this.authService.login(user);
  }

  @Post('refresh')
  async refresh(@Body() body): Promise<ResponseData<any>> {
    return await this.authService.refresh(body.refresh);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(
    @Body()
    user: User,
  ): Promise<ResponseData<any>> {
    return await this.authService.logout(user);
  }
}
