import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { RequestWithUser } from "./auth/auth.dto";
import { Request } from "express";

@Injectable()
/**
 * to ensure the target operation is performed by a specific user with the jwt sub id
 */
export abstract class IsUserAllowedGuard implements CanActivate {
	constructor() {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context
			.switchToHttp()
			.getRequest<RequestWithUser<Request>>();
		const operationTargetId = parseInt(request.params.id);
		const allowedIds = await this.getAllowedUserIds(operationTargetId);
		const subId = request.user.sub;

		return allowedIds.includes(subId);
	}

	abstract getAllowedUserIds(targetId?: number): Promise<number[]> | number[];
}
