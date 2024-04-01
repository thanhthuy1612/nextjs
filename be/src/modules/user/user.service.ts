import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/models/UserScheme';
import mongoose from 'mongoose';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async findAll(): Promise<ResponseData<User>> {
    try {
      const accounts = await this.userModel.find();
      return new ResponseData<User>(
        accounts,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log(error);
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
  async create(user: User): Promise<ResponseData<User | string>> {
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
      return new ResponseData<User>(
        users,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log(error);
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  async findByLogin(user: User): Promise<ResponseData<User | string>> {
    try {
      const findUser = await this.userModel.find({
        email: user.email,
      });

      if (!findUser) {
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

  async findById(id: string): Promise<ResponseData<User>> {
    try {
      const users = await this.userModel.findById(id);
      return new ResponseData<User>(
        users,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log(error);
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  async update(id: string, user: User): Promise<ResponseData<User>> {
    try {
      const users = await this.userModel.findByIdAndUpdate(id, user);
      return new ResponseData<User>(
        users,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log(error);
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
  async delete(id: string): Promise<ResponseData<User>> {
    try {
      const users = await this.userModel.findByIdAndDelete(id);
      return new ResponseData<User>(
        users,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log(error);
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
}
