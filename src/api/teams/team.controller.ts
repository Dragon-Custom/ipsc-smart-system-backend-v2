import { Controller, UseGuards } from "@nestjs/common";
import { TeamsService } from "./team.service";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { Team } from "src/entities";
import { AuthPreset, CreateAuthRouteGroup, mixinCrudConfig } from "src/utils";
import { CreateTeamDto, TeamDto, UpdateTeamDto } from "./teams.dto";
import { AuthGuard } from "../auth/auth.guard";
import { IsTeamOwnerGuard } from "./team.guard";

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
		routes: CreateAuthRouteGroup([
			{
				route: [...AuthPreset.C],
				options: {
					decorators: [UseGuards(AuthGuard)],
				},
			},
			{
				route: [...AuthPreset.U, ...AuthPreset.D],
				options: {
					decorators: [UseGuards(AuthGuard, IsTeamOwnerGuard)],
				},
			},
		]),
	}),
)
export class TeamsController implements CrudController<Team> {
	constructor(public service: TeamsService) {}
}
