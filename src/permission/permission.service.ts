import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private _permissionRepository: Repository<Permission>,
  ) {}

  findAll() {
    return this._permissionRepository.find();
  }

  findOne(id: number) {
    return this._permissionRepository.findOneBy({ id });
  }
}
