import { Controller } from "@nestjs/common";
import { StagesService } from "./stages.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { Stage } from "src/entities";
import { mixinCrudConfig } from "src/types/mixinGlobalCRUDConfig";
import { CreateStageDto, StageDto, UpdateStageDto } from "./stages.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("stages")
@ApiTags("stages")
@Crud(
	mixinCrudConfig({
		model: {
			type: StageDto,
		},
		dto: {
			create: CreateStageDto,
			replace: CreateStageDto,
			update: UpdateStageDto,
		},
	}),
)
export class StagesController implements CrudController<Stage> {
	constructor(public readonly service: StagesService) {}
}
