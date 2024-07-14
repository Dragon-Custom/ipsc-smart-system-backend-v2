import { InjectRepository } from "@nestjs/typeorm";
import { IsUserAllowedGuard } from "src/api/isUserAllowed.guard";
import { Match } from "src/entities";
import { Repository } from "typeorm";

export class IsMatchOrganizerGuard extends IsUserAllowedGuard {
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
