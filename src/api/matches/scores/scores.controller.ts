import { Controller } from "@nestjs/common";
import { ScoresService } from "./scores.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { Score } from "src/entities";
import {
	CreateRouteGroup,
	mixinCrudConfig,
	RouteOperationPreset,
} from "src/utils";
import { CreateScoreDto, ScoreDto, UpdateScoreDto } from "./scores.dto";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/api/auth/auth.guard";
import { OriginalTargetEntity } from "../convertToMatchId.guard";
import { IsMatchStaffGuard } from "../match-staffs/match-staffs.guard";

@Controller()
@ApiTags("Scores")
@Crud(
	mixinCrudConfig({
		model: {
			type: ScoreDto,
		},
		dto: {
			create: CreateScoreDto,
			replace: CreateScoreDto,
			update: UpdateScoreDto,
		},
		routes: CreateRouteGroup([
			{
				route: [
					...RouteOperationPreset.C,
					...RouteOperationPreset.U,
					...RouteOperationPreset.D,
				],
				options: {
					decorators: [OriginalTargetEntity(Score)],
				},
				guard: [AuthGuard, IsMatchStaffGuard],
			},
		]),
	}),
)
export class ScoresController implements CrudController<Score> {
	constructor(public readonly service: ScoresService) {}
}
