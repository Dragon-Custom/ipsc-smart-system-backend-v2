import { Controller } from "@nestjs/common";
import { MatchStagesService } from "./match-stages.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { MatchStage } from "src/entities";
import { mixinCrudConfig } from "src/utils";
import {
	CreateMatchStageDto,
	MatchStageDto,
	UpdateMatchStageDto,
} from "./match-stages.dto";
import { ApiTags } from "@nestjs/swagger";

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
	}),
)
export class MatchStagesController implements CrudController<MatchStage> {
	constructor(public readonly service: MatchStagesService) {}
}
