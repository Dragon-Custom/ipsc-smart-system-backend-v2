import { InjectRepository } from "@nestjs/typeorm";
import { IsUserAllowedGuard } from "../isUserAllowed.guard";
import { Stage } from "src/entities";
import { Repository } from "typeorm";

export class IsStageDesignerItself extends IsUserAllowedGuard {
	customTargetId = (x) => x;

	constructor(
		@InjectRepository(Stage) private readonly stageRepo: Repository<Stage>,
	) {
		super();
	}

	async getAllowedUserIds(targetId?: number): Promise<number[]> {
		const stage = await this.stageRepo.findOne({
			where: {
				id: targetId,
			},
		});
		return [stage.designerId];
	}
}
