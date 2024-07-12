import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "src/entities";
import { JwtService } from "@nestjs/jwt";
import { LoginResponseDto } from "./auth.dto";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async signIn(email: string, pass: string): Promise<LoginResponseDto> {
		const user = await this.usersService.findOne({
			where: {
				email,
			},
		});
		if (user?.encryptedPassword !== (await User.hashPassword(pass))) {
			throw new UnauthorizedException();
		}

		const payload = {
			sub: user.id,
			username: user.nickname,
			email: user.email,
			isSystemAdmin: undefined,
		};
		if (user.isSystemAdmin === true) payload.isSystemAdmin = true;
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
