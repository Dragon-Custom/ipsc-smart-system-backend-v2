import { Controller, UseGuards } from "@nestjs/common";
import { TeamsService } from "./team.service";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { Team } from "src/entities";
import {
	CreateRouteGroup,
	mixinCrudConfig,
	RouteOperationPreset,
} from "src/utils";
import { CreateTeamDto, TeamDto, UpdateTeamDto } from "./teams.dto";
import { AuthGuard } from "../auth/auth.guard";
import { IsUserItselfGuard } from "../users/users.guard";

@Controller("teams")
@ApiTags("teams")
@Crud(
	mixinCrudConfig({
		model: {
			type: TeamDto,
		},
		dto: {
			create: CreateTeamDto,
			replace: CreateTeamDto,
			update: UpdateTeamDto,
		},
		query: {
			softDelete: false,
		},
	}),
)
export class TeamsController implements CrudController<Team> {
	constructor(public service: TeamsService) {}
}
