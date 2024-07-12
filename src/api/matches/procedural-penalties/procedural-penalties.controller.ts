import { Controller } from "@nestjs/common";
import { ProceduralPenaltiesService } from "./procedural-penalties.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { ProceduralPenalty } from "src/entities";
import { mixinCrudConfig } from "src/types/mixinGlobalCRUDConfig";
import {
	CreateProceduralPenaltyDto,
	ProceduralPenaltyDto,
	UpdateProceduralPenaltyDto,
} from "./procedural-penalties.dto";

@Controller("matches/procedural-penalties")
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
