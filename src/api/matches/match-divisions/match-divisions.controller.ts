import { Controller } from "@nestjs/common";
import { MatchDivisionsService } from "./match-divisions.service";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import {
	CreateRouteGroup,
	mixinCrudConfig,
	RouteOperationPreset,
} from "src/utils";
import {
	CreateMatchDivisionDto,
	MatchDivisionsDto,
	UpdateMatchDivisionDto,
} from "./match-divisions.dto";
import { MatchDivision } from "src/entities";
import { OriginalTargetEntity } from "../convertToMatchId.guard";
import { IsMatchStaffOrOrganizerGuard } from "../match-staffs/match-staffs.guard";
import { AuthGuard } from "src/api/auth/auth.guard";

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
		routes: CreateRouteGroup([
			{
				route: [
					...RouteOperationPreset.C,
					...RouteOperationPreset.U,
					...RouteOperationPreset.D,
				],
				options: {
					decorators: [OriginalTargetEntity(MatchDivision)],
				},
				guard: [AuthGuard, IsMatchStaffOrOrganizerGuard],
			},
		]),
	}),
)
export class MatchDivisionsController implements CrudController<MatchDivision> {
	constructor(public readonly service: MatchDivisionsService) {}
}
