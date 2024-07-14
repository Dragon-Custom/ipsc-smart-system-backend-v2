import { RequestWithUser } from "src/api/auth/auth.dto";
import { IsUserAllowedGuard } from "src/api/isUserAllowed.guard";
import { REAL_MATCHID_TOKEN } from "../matches/matches.guard";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { Match, MatchStaff } from "src/entities";
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

export class IsMatchStaffOrOrganizerGuard extends IsMatchStaffGuard {
	constructor(
		@InjectRepository(MatchStaff)
		matchStaffRepo: Repository<MatchStaff>,
		@InjectRepository(Match)
		private readonly matchRepo: Repository<Match>,
	) {
		super(matchStaffRepo);
	}
	async getAllowedUserIds(targetId?: number): Promise<number[]> {
		const staff = await super.getAllowedUserIds(targetId);
		const organizer = await this.matchRepo.findOne({
			where: { id: targetId },
		});
		return [...staff, organizer.organizerId];
	}
}
