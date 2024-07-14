import { Controller } from "@nestjs/common";
import { MatchesService } from "./matches.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { Match } from "src/entities";
import { ApiTags } from "@nestjs/swagger";
import {
	CreateRouteGroup,
	mixinCrudConfig,
	RouteOperationPreset,
} from "src/utils";
import { CreateMatchDto, MatchDto, UpdateMatchDto } from "./matches.dto";
import { AuthGuard } from "src/api/auth/auth.guard";
import { IsMatchOrganizerGuard } from "./matches.guard";

@Controller()
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
		routes: CreateRouteGroup([
			{
				route: [...RouteOperationPreset.C],
				guard: [AuthGuard],
			},
			{
				route: [...RouteOperationPreset.U, ...RouteOperationPreset.D],
				guard: [AuthGuard, IsMatchOrganizerGuard],
			},
		]),
	}),
)
export class MatchesController implements CrudController<Match> {
	constructor(public readonly service: MatchesService) {}
}
