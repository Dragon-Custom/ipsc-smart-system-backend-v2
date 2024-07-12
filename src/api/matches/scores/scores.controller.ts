import { Controller } from "@nestjs/common";
import { ScoresService } from "./scores.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { Score } from "src/entities";
import { mixinCrudConfig } from "src/utils";
import { CreateScoreDto, ScoreDto, UpdateScoreDto } from "./scores.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("matches/scores")
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
	}),
)
export class ScoresController implements CrudController<Score> {
	constructor(public readonly service: ScoresService) {}
}
