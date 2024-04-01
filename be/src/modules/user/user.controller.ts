import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseData } from 'src/global/globalClass';
import { User } from 'src/models/UserScheme';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUser(): Promise<ResponseData<User>> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(
    @Param('id')
    id: string,
  ): Promise<ResponseData<User>> {
    return this.userService.findById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id')
    id: string,
    @Body()
    user: User,
  ): Promise<ResponseData<User>> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id')
    id: string,
  ): Promise<ResponseData<User>> {
    return this.userService.delete(id);
  }
}
