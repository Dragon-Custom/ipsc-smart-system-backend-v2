import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, EntityTarget } from "typeorm";
import { REAL_MATCHID_TOKEN } from "./matches/matches.guard";

export const OriginalTargetEntity =
	Reflector.createDecorator<EntityTarget<any>>();

export class ConvertToMatchIdGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		@InjectDataSource() private readonly datasource: DataSource,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const entity = this.reflector.get(
			OriginalTargetEntity,
			context.getHandler(),
		);
		if (!entity) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const orignalObject = await this.datasource.manager.findOne(entity, {
			where: {
				id: parseInt(request.params.id),
			},
		});
		request[REAL_MATCHID_TOKEN] = orignalObject.matchId;
		console.log(
			`Converted ${request.params.id} To Read MatchId: ${request[REAL_MATCHID_TOKEN]}`,
		);
		return true;
	}
}
