import {forwardRef, Module} from '@nestjs/common';
import {ShiftEntryBridgingService} from './shift-entry-bridging.service';
import {ShiftEntryBridgingController} from './shift-entry-bridging.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ShiftEntryBridging} from './entities/shift-entry-bridging.entity';
import {UserModule} from '../user/user.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([ShiftEntryBridging]),
    forwardRef(() => UserModule),
  ],
  controllers : [ShiftEntryBridgingController],
  providers : [ShiftEntryBridgingService],
})
export class ShiftEntryBridgingModule {
}
