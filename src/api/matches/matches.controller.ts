import { Controller } from "@nestjs/common";
import { MatchesService } from "./matches.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { Match } from "src/entities";
import { ApiTags } from "@nestjs/swagger";
import { mixinCrudConfig } from "src/types/mixinGlobalCRUDConfig";
import { CreateMatchDto, MatchDto, UpdateMatchDto } from "./matches.dto";

@Controller("matches")
@ApiTags("Matches")
@Crud(
	mixinCrudConfig({
		model: {
			type: MatchDto,
		},
		dto: {
			create: CreateMatchDto,
			replace: CreateMatchDto,
			update: UpdateMatchDto,
		},
	}),
)
export class MatchesController implements CrudController<Match> {
	constructor(public readonly service: MatchesService) {}
}
