import { Controller } from "@nestjs/common";
import { ScoreProceduralPenaltiesService } from "./score-procedural-penalties.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { ScoreProceduralPenalty } from "src/entities";
import { ApiTags } from "@nestjs/swagger";
import { mixinCrudConfig } from "src/utils";
import {
	CreateScoreProceduralPenaltyDto,
	UpdateScoreProceduralPenaltyDto,
} from "./score-procedural-penalties.dto";

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
	}),
)
export class ScoreProceduralPenaltiesController
	implements CrudController<ScoreProceduralPenalty>
{
	constructor(public readonly service: ScoreProceduralPenaltiesService) {}
}
