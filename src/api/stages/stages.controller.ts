import { Controller, UseGuards } from "@nestjs/common";
import { StagesService } from "./stages.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { Stage } from "src/entities";
import { AuthPreset, CreateAuthRouteGroup, mixinCrudConfig } from "src/utils";
import { CreateStageDto, StageDto, UpdateStageDto } from "./stages.dto";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";

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
		routes: CreateAuthRouteGroup([
			{
				route: [...AuthPreset.C, ...AuthPreset.U, ...AuthPreset.D],
				options: {
					decorators: [UseGuards(AuthGuard)],
				},
			},
		]),
	}),
)
export class StagesController implements CrudController<Stage> {
	constructor(public readonly service: StagesService) {}
}
