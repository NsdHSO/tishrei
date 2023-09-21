import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import {User} from './entities/user.entity';
import {AppDataSource} from '../../data-source';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UserService {


  constructor(
    @InjectRepository(User)
    private _userService: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = createUserDto;
    const userDao = this._userService.create(newUser);
    return this._userService.save(userDao);
  }

  findAll() {
    return this._userService.find()
  }

  findOne(id: number) {
    return this._userService.findOneBy({employee_id:id})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
