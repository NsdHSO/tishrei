import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ShiftEntryBridgingModule,
} from '../shift-entry-bridging/shift-entry-bridging.module';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ShiftEntryBridgingModule),
  ],
  controllers : [UserController],
  providers : [UserService, JwtService],
  exports : [
    TypeOrmModule,
    UserService,
  ],
})
export class UserModule {
}
