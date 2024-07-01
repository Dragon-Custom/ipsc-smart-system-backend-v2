import { Controller } from "@nestjs/common";
import { MatchesService } from "./matches.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { Match } from "src/entities";
import { ApiTags } from "@nestjs/swagger";
import { mixinCrudConfig } from "src/types";
import { CreateMatchDto, MatchDto, UpdateMatchDto } from "./matches.dto";

@Controller("matches")
@ApiTags("matches")
@Crud(
	mixinCrudConfig({
		model: {
			type: MatchDto,
		},
		dto: {
			create: CreateMatchDto,
			update: UpdateMatchDto,
			replace: CreateMatchDto,
		},
	}),
)
export class MatchesController implements CrudController<Match> {
	constructor(public service: MatchesService) {}
}
