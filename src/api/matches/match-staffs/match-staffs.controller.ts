import { Controller } from "@nestjs/common";
import { MatchStaffsService } from "./match-staffs.service";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { MatchStaff } from "src/entities";
import {
	CreateRouteGroup,
	mixinCrudConfig,
	RouteOperationPreset,
} from "src/utils";
import {
	CreateMatchStaffsDto,
	MatchStaffsDto,
	UpdateMatchStaffsDto,
} from "./match-staffs.dto";
import { AuthGuard } from "src/api/auth/auth.guard";
import { IsMatchOrganizerGuard } from "../matches/matches.guard";
import { OriginalTargetEntity } from "../convertToMatchId.guard";

@Controller()
@ApiTags("Match Staffs")
@Crud(
	mixinCrudConfig({
		model: {
			type: MatchStaffsDto,
		},
		dto: {
			create: CreateMatchStaffsDto,
			replace: CreateMatchStaffsDto,
			update: UpdateMatchStaffsDto,
		},
		routes: CreateRouteGroup([
			{
				route: [
					...RouteOperationPreset.C,
					...RouteOperationPreset.U,
					...RouteOperationPreset.D,
				],
				options: {
					decorators: [OriginalTargetEntity(MatchStaff)],
				},
				guard: [AuthGuard, IsMatchOrganizerGuard],
			},
		]),
	}),
)
export class MatchStaffsController implements CrudController<MatchStaff> {
	constructor(public readonly service: MatchStaffsService) {}
}
