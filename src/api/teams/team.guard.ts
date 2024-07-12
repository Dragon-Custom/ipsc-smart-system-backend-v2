import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RequestWithUser } from "../auth/auth.dto";
import { UsersService } from "../users/users.service";

export const ROLES_KEY = "roles";

@Injectable()
export class IsTeamOwnerGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private userService: UsersService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: RequestWithUser = context.switchToHttp().getRequest();
		const user = await this.userService.findOne({
			where: {
				id: request.user.sub,
			},
		});
		if (user.isSystemAdmin === true) return true;
		if (user.ownsTeamId === parseInt(request.params.id)) return true;
		return false;
	}
}
