import { Controller } from "@nestjs/common";
import { StagesService } from "./stages.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { Stage } from "src/entities";
import {
	CreateRouteGroup,
	mixinCrudConfig,
	RouteOperationPreset,
} from "src/utils";
import { CreateStageDto, StageDto, UpdateStageDto } from "./stages.dto";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { IsStageDesignerItself } from "./stages.guard";

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
		routes: CreateRouteGroup([
			{
				route: [...RouteOperationPreset.C],
				guard: [AuthGuard],
			},
			{
				route: [...RouteOperationPreset.U, ...RouteOperationPreset.D],
				guard: [AuthGuard, IsStageDesignerItself],
			},
		]),
	}),
)
export class StagesController implements CrudController<Stage> {
	constructor(public readonly service: StagesService) {}
}
