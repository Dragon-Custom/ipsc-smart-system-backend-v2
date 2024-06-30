import { Controller } from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { Team } from "src/entities";
import { mixinCrudConfig } from "src/types";
import { CreateTeamDto, TeamDto, UpdateTeamDto } from "./teams.dto";

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
