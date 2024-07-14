import { Controller } from "@nestjs/common";
import { MatchDivisionsService } from "./match-divisions.service";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { mixinCrudConfig } from "src/utils";
import {
	CreateMatchDivisionDto,
	MatchDivisionsDto,
	UpdateMatchDivisionDto,
} from "./match-divisions.dto";
import { MatchDivision } from "src/entities";

@Controller()
@ApiTags("Match Divisions")
@Crud(
	mixinCrudConfig({
		model: {
			type: MatchDivisionsDto,
		},
		dto: {
			create: CreateMatchDivisionDto,
			update: UpdateMatchDivisionDto,
			replace: CreateMatchDivisionDto,
		},
	}),
)
export class MatchDivisionsController implements CrudController<MatchDivision> {
	constructor(public readonly service: MatchDivisionsService) {}
}
