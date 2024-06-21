import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async login(username: string, pass: string): Promise<any> {
		const user = await this.userService.findOne({
			name: username,
		});
		if (
			user?.encryptedPassword !== this.userService.encryptePassword(pass)
		) {
			throw new UnauthorizedException();
		}
		const { encryptedPassword, ...result } = user;
		// TODO: Generate a JWT and return it here
		// instead of the user object
		return result;
	}
}
