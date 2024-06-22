import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async signIn(username: string, pass: string): Promise<string> {
		const user = await this.userService.findOne({
			name: username,
		});
		if (
			user?.encryptedPassword !== this.userService.encryptePassword(pass)
		) {
			throw new UnauthorizedException();
		}
		const payload = { sub: user.id, name: user.name };
		return await this.jwtService.signAsync(payload);
	}
}
