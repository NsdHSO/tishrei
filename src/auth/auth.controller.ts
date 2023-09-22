import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './gurads/local-auth-guard';
import { RefreshTokenGuard } from './gurads/refresh-jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @Post('register')
  async register(@Body() request) {
    return this.userService.create(request);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refresh(@Request() request) {
    return this.authService.refreshToken(request);
    
  }
}
