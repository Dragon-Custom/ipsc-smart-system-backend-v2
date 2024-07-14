import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { RequestWithUser } from "./auth/auth.dto";
import { Request } from "express";

@Injectable()
/**
 * to ensure the target operation is performed by a specific user with the jwt sub id
 */
export abstract class SpecificIdGuard implements CanActivate {
	constructor() {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context
			.switchToHttp()
			.getRequest<RequestWithUser<Request>>();

		const allowedIds = await this.getAllowedIds(request);
		const subId = request.user.sub;

		return allowedIds.includes(subId);
	}

	abstract getAllowedIds(
		request: RequestWithUser<Request>,
	): Promise<number[]>;
}
