import { Controller } from "@nestjs/common";
import { StagesService } from "./stages.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { Stage } from "src/entities";
import { ApiTags } from "@nestjs/swagger";
import { mixinCrudConfig } from "src/types";
import { CreateStageDto, StagesDto, UpdateStageDto } from "./stages.dto";

@Controller("stages")
@ApiTags("stages")
@Crud(
	mixinCrudConfig({
		model: {
			type: StagesDto,
		},
		dto: {
			create: CreateStageDto,
			update: UpdateStageDto,
			replace: CreateStageDto,
		},
	}),
)
export class StagesController implements CrudController<Stage> {
	constructor(public service: StagesService) {}
}
