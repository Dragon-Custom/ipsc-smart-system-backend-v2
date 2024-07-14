import { Controller } from "@nestjs/common";
import { ScoreProceduralPenaltiesService } from "./score-procedural-penalties.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { ScoreProceduralPenalty } from "src/entities";
import { ApiTags } from "@nestjs/swagger";
import {
	CreateRouteGroup,
	mixinCrudConfig,
	RouteOperationPreset,
} from "src/utils";
import {
	CreateScoreProceduralPenaltyDto,
	UpdateScoreProceduralPenaltyDto,
} from "./score-procedural-penalties.dto";
import { OriginalTargetEntity } from "../convertToMatchId.guard";
import { IsMatchStaffGuard } from "../match-staffs/match-staffs.guard";
import { AuthGuard } from "src/api/auth/auth.guard";

@Controller()
@ApiTags("Score Procedural Penalties")
@Crud(
	mixinCrudConfig({
		model: {
			type: ScoreProceduralPenalty,
		},
		dto: {
			create: CreateScoreProceduralPenaltyDto,
			replace: CreateScoreProceduralPenaltyDto,
			update: UpdateScoreProceduralPenaltyDto,
		},
		routes: CreateRouteGroup([
			{
				route: [
					...RouteOperationPreset.C,
					...RouteOperationPreset.U,
					...RouteOperationPreset.D,
				],
				options: {
					decorators: [OriginalTargetEntity(ScoreProceduralPenalty)],
				},
				guard: [AuthGuard, IsMatchStaffGuard],
			},
		]),
	}),
)
export class ScoreProceduralPenaltiesController
	implements CrudController<ScoreProceduralPenalty>
{
	constructor(public readonly service: ScoreProceduralPenaltiesService) {}
}
