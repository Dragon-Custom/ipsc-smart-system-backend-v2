import { Controller } from "@nestjs/common";
import { ProceduralPenaltiesService } from "./procedural-penalties.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { ProceduralPenalty } from "src/entities";
import {
	CreateRouteGroup,
	mixinCrudConfig,
	RouteOperationPreset,
} from "src/utils";
import {
	CreateProceduralPenaltyDto,
	ProceduralPenaltyDto,
	UpdateProceduralPenaltyDto,
} from "./procedural-penalties.dto";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/api/auth/auth.guard";

//TODO: needs to refactor to enable permission based access control
@Controller()
@ApiTags("Procedural Penalties")
@Crud(
	mixinCrudConfig({
		model: {
			type: ProceduralPenaltyDto,
		},
		dto: {
			create: CreateProceduralPenaltyDto,
			replace: CreateProceduralPenaltyDto,
			update: UpdateProceduralPenaltyDto,
		},
		routes: CreateRouteGroup([
			{
				route: [
					...RouteOperationPreset.C,
					...RouteOperationPreset.U,
					...RouteOperationPreset.D,
				],
				guard: [AuthGuard],
			},
		]),
	}),
)
export class ProceduralPenaltiesController
	implements CrudController<ProceduralPenalty>
{
	constructor(public readonly service: ProceduralPenaltiesService) {}
}
