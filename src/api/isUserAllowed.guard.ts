import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { RequestWithUser } from "./auth/auth.dto";
import { Request } from "express";

@Injectable()
/**
 * to ensure the target operation is performed by a specific user with the jwt sub id
 */
export abstract class IsUserAllowedGuard implements CanActivate {
	protected constructor() {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context
			.switchToHttp()
			.getRequest<RequestWithUser<Request>>();

		const operationTargetId = parseInt(request.params.id);
		const realTargetId = this.customTargetId(operationTargetId, request);
		const allowedIds = await this.getAllowedUserIds(realTargetId);
		const subId = request.user.sub;

		return allowedIds.includes(subId);
	}

	abstract getAllowedUserIds(targetId?: number): Promise<number[]> | number[];

	abstract customTargetId(
		originalTargetId: number,
		request: RequestWithUser<Request>,
	): number;
}
