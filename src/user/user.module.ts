import {forwardRef, Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {
  ShiftEntryBridgingModule,
} from '../shift-entry-bridging/shift-entry-bridging.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ShiftEntryBridgingModule),
  ],
  controllers : [UserController],
  providers : [UserService],
  exports : [
    TypeOrmModule,
    UserService,
  ],
})
export class UserModule {
}
