import { Controller, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ResponseData } from 'src/global/globalClass';
import { User } from 'src/user/models/UserScheme';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUser(): Promise<ResponseData<User>> {
    return this.userService.findAll();
  }

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
