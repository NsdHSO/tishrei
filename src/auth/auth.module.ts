import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strageties/jwt-strategy';
import { LocalStrategy } from './strageties/local-strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService, LocalStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    JwtModule.register({
      secret: `${process.env.ACCESS_TOKEN_SECRET}`,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
