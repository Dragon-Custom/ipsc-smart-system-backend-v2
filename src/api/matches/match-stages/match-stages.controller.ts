import { Controller } from "@nestjs/common";
import { MatchStagesService } from "./match-stages.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { MatchStage } from "src/entities";
import {
	CreateRouteGroup,
	mixinCrudConfig,
	RouteOperationPreset,
} from "src/utils";
import {
	CreateMatchStageDto,
	MatchStageDto,
	UpdateMatchStageDto,
} from "./match-stages.dto";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/api/auth/auth.guard";
import { IsMatchStaffOrOrganizerGuard } from "../match-staffs/match-staffs.guard";
import { OriginalTargetEntity } from "../convertToMatchId.guard";

@Controller()
@ApiTags("Match Stages")
@Crud(
	mixinCrudConfig({
		model: {
			type: MatchStageDto,
		},
		dto: {
			create: CreateMatchStageDto,
			replace: CreateMatchStageDto,
			update: UpdateMatchStageDto,
		},
		routes: CreateRouteGroup([
			{
				route: [
					...RouteOperationPreset.C,
					...RouteOperationPreset.U,
					...RouteOperationPreset.D,
				],
				options: {
					decorators: [OriginalTargetEntity(MatchStage)],
				},
				guard: [AuthGuard, IsMatchStaffOrOrganizerGuard],
			},
		]),
	}),
)
export class MatchStagesController implements CrudController<MatchStage> {
	constructor(public readonly service: MatchStagesService) {}
}
