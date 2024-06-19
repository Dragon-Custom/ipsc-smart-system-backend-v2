import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/app";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService,
	) {}

	async login(
		email: string,
		pass: string,
	): Promise<{ access_token: string }> {
		// get user encrypted password from database
		const user = await this.usersService.findOne({
			email: email,
		});

		if (
			// check if encrypted password matches the entered password
			user?.encryptedPassword !== this.usersService.encryptePassword(pass)
		) {
			// throw unauthorized exception if password is incorrect
			throw new UnauthorizedException();
		}

		// Generate a JWT and return it here
		const payload = {
			sub: user.id,
			username: user.nickname,
			email: user.email,
		};
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
