import { InjectRepository } from "@nestjs/typeorm";
import { IsUserAllowedGuard } from "../isUserAllowed.guard";
import { Team } from "src/entities";
import { Repository } from "typeorm";

export class IsTeamAdminGuard extends IsUserAllowedGuard {
	constructor(
		@InjectRepository(Team)
		private readonly teamRepository: Repository<Team>,
	) {
		super();
	}

	async getAllowedUserIds(targetId?: number): Promise<number[]> {
		const team = await this.teamRepository.findOne({
			where: { id: targetId },
			select: {
				admins: true,
			},
		});
		return team.adminIds;
	}
}

export class IsTeamOwnerGuard extends IsUserAllowedGuard {
	constructor(
		@InjectRepository(Team)
		private readonly teamRepository: Repository<Team>,
	) {
		super();
	}

	async getAllowedUserIds(targetId?: number): Promise<number[]> {
		const team = await this.teamRepository.findOne({
			where: { id: targetId },
			select: {
				ownerId: true,
			},
		});
		return [team.ownerId];
	}
}

export class IsTeamOwnerOrAdminGuard extends IsUserAllowedGuard {
	constructor(
		@InjectRepository(Team)
		private readonly teamRepository: Repository<Team>,
	) {
		super();
	}

	async getAllowedUserIds(targetId?: number): Promise<number[]> {
		const team = await this.teamRepository.findOne({
			where: { id: targetId },
			select: {
				ownerId: true,
				admins: true,
			},
		});
		console.log(team);
		return [team.ownerId, ...team.adminIds];
	}
}
