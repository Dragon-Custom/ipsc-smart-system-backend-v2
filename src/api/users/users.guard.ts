import { IsUserAllowedGuard } from "../isUserAllowed.guard";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities";
import { Repository } from "typeorm";

export class IsUserItselfGuard extends IsUserAllowedGuard {
	customTargetId = (x) => x;

	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
	) {
		super();
	}

	getAllowedUserIds(targetId?: number): number[] {
		if (targetId) {
			return [targetId];
		}
		return [];
	}
}
