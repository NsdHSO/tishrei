import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config.service';
import { UserModule } from './user/user.module';
import { PermissionModule } from './permission/permission.module';
import { ShiftEntryBridgingModule } from './shift-entry-bridging/shift-entry-bridging.module';

@Module({
  imports : [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    PermissionModule,
    ShiftEntryBridgingModule,
  ],
  controllers : [AppController],
  providers : [AppService],
})
export class AppModule {
}
