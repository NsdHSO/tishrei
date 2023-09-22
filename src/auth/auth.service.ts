import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  /**
   *
   * @param userEmail password of the user to authenticate 
   * @param passoword Password password for the user account
   * @returns
   **/
  async validateUser(username: string, password: string) {
   const user = await this.userService.findByEmail(username) as any;
   
   if (user && (await bcrypt.compare(password, user.password))) {
     const { password, ...result } = user;
     return result;
   }
   return null;
 }
  /**
   * Login the user with the specified password and email
   * @param user email of the user to authenticate
   * @returns 
   */ 
  async login(user: any) {
    const payload = {
      email: user.email,
      password: user.password,
    };

    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
