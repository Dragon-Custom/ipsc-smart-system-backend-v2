import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { RequestWithUser } from "src/api/auth/auth.dto";
import { IsUserAllowedGuard } from "src/api/isUserAllowed.guard";
import { Match } from "src/entities";
import { Repository } from "typeorm";

export const REAL_MATCHID_TOKEN = `real_matchid_token_${Math.random()}`;

export class IsMatchOrganizerGuard extends IsUserAllowedGuard {
	customTargetId(
		originalTargetId: number,
		request: RequestWithUser<Request>,
	) {
		return request[REAL_MATCHID_TOKEN] || originalTargetId;
	}

	constructor(
		@InjectRepository(Match) private readonly matchRepo: Repository<Match>,
	) {
		super();
	}

	async getAllowedUserIds(targetId?: number): Promise<number[]> {
		const match = await this.matchRepo.findOne({
			where: { id: targetId },
		});
		return [match.organizerId];
	}
}
