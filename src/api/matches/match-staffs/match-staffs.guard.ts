import { RequestWithUser } from "src/api/auth/auth.dto";
import { IsUserAllowedGuard } from "src/api/isUserAllowed.guard";
import { REAL_MATCHID_TOKEN } from "../matches/matches.guard";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { MatchStaff } from "src/entities";
import { Repository } from "typeorm";

export class IsMatchStaffGuard extends IsUserAllowedGuard {
	customTargetId(
		originalTargetId: number,
		request: RequestWithUser<Request>,
	) {
		return request[REAL_MATCHID_TOKEN] || originalTargetId;
	}

	constructor(
		@InjectRepository(MatchStaff)
		private readonly matchStaffRepo: Repository<MatchStaff>,
	) {
		super();
	}

	async getAllowedUserIds(targetId?: number): Promise<number[]> {
		const staff = await this.matchStaffRepo.find({
			where: { matchId: targetId },
		});
		return staff.map((s) => s.userId);
	}
}
