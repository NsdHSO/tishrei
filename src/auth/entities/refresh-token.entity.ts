import { sign } from 'jsonwebtoken';
export class RefreshTokent{
	id: number;
	userId: number;
	userAgent: string;
	ipAddress: string;
	sign(){
		return sign({...this}, process.env.REFRESH_TOKEN_SECRET);
	}
}