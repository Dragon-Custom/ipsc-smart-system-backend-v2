import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RequestWithUser } from "../auth/auth.dto";
import { UsersService } from "../users/users.service";
import { MatchesService } from "./matches.service";

export const ROLES_KEY = "roles";

@Injectable()
export class IsMatchOrganizerGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private matchService: MatchesService,
		private usersService: UsersService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: RequestWithUser = context.switchToHttp().getRequest();
		const match = await this.matchService.findOne({
			where: {
				id: parseInt(request.params.id),
			},
		});
		const user = await this.usersService.findOne({
			where: {
				id: request.user.sub,
			},
		});
		if (user.isSystemAdmin === true) return true;
		if (match.organizerId === user.id) return true;
		return false;
	}
}
