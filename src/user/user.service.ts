import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private _userService: Repository<User>,
    private jwtService: JwtService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = createUserDto;
    const payload = {
      username: newUser.email,
      sub: {
        name: newUser.full_name,
      },
    };
    newUser.refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    const userDao = this._userService.create(newUser);
    return this._userService.save(userDao).then(v => {
      const {refreshToken, ...userDao} = v;
      return userDao
    });
  }

  findAll() {
    return this._userService.find();
  }

  findOne(id: number) {
    return this._userService.findOneBy({ employee_id: id });
  }
  async findByEmail(email: string) {
    return await this._userService.findOne({ where: { email: email } });
  }
  async update(email: string, refreshToken: any) {
    return await this._userService
      .findOne({ where: { email: email } })
      .then((user) => {
        this._userService.update('refreshToken', {
          refreshToken: refreshToken,
        });
      });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
