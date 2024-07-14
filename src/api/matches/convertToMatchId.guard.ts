import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	NotFoundException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, EntityTarget } from "typeorm";
import { REAL_MATCHID_TOKEN } from "./matches/matches.guard";

export const OriginalTargetEntity =
	Reflector.createDecorator<EntityTarget<Required<EntityWithMatchId>>>();

export abstract class EntityWithMatchId {
	abstract id: number;
	abstract matchId: number;
}

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
		const parsedId = parseInt(request.params.id);
		if (isNaN(parsedId)) {
			throw new BadRequestException("Invalid ID");
		}
		const orignalObject = await this.datasource.manager.findOne(entity, {
			where: {
				id: parsedId,
			},
		});
		if (!orignalObject) {
			throw new NotFoundException("Object not found");
		}
		request[REAL_MATCHID_TOKEN] = orignalObject.matchId;
		console.log(
			`Converted ${request.params.id} To Read MatchId: ${request[REAL_MATCHID_TOKEN]}`,
		);
		return true;
	}
}
