import { Controller } from "@nestjs/common";
import { ProceduralPenaltiesService } from "./procedural-penalties.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { ProceduralPenalty } from "src/entities";
import { mixinCrudConfig } from "src/utils";
import {
	CreateProceduralPenaltyDto,
	ProceduralPenaltyDto,
	UpdateProceduralPenaltyDto,
} from "./procedural-penalties.dto";
import { ApiTags } from "@nestjs/swagger";

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
	}),
)
export class ProceduralPenaltiesController
	implements CrudController<ProceduralPenalty>
{
	constructor(public readonly service: ProceduralPenaltiesService) {}
}
