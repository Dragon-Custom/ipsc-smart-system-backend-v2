import { Controller, UseGuards } from "@nestjs/common";
import { MatchesService } from "./matches.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { Match } from "src/entities";
import { ApiTags } from "@nestjs/swagger";
import { AuthPreset, CreateAuthRouteGroup, mixinCrudConfig } from "src/utils";
import { CreateMatchDto, MatchDto, UpdateMatchDto } from "./matches.dto";
import { AuthGuard } from "../auth/auth.guard";
import { IsMatchOrganizerGuard } from "./matches.guard";

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
					decorators: [UseGuards(AuthGuard, IsMatchOrganizerGuard)],
				},
			},
		]),
	}),
)
export class MatchesController implements CrudController<Match> {
	constructor(public readonly service: MatchesService) {}
}
