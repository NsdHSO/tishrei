import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh',
  ) {
	constructor() {
	  super({
		jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
		ignoreExpiration: false,
		secretOrKey: `${process.env.REFRESH_TOKEN_SECRET}`,
	  });
	}
  
	async validate(payload: any) {
	  return { user: payload.sub, username: payload.username };
	}
}
