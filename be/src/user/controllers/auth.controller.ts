import { Controller, Post, Body } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { User } from 'src/user/models/UserScheme';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
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
}
