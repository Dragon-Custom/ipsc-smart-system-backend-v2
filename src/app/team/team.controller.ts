import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Put,
} from "@nestjs/common";
import { TEAM_PAGINATION_CONFIG, TeamService } from "./team.service";
import { ApiNotFoundResponse, ApiProperty, ApiTags } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";
import { Paginate, PaginateQuery, PaginatedSwaggerDocs } from "nestjs-paginate";
import { Team } from "src/entities";
import { CreateTeamDto } from "./dto/create-team.dto";

export class FindUniqueTeamByIdParams {
	@ApiProperty()
	@Type(() => Number)
	@IsInt()
	id: number;
}
@ApiTags("team")
@Controller("team")
export class TeamController {
	constructor(private readonly teamService: TeamService) {}

	@Get(":id")
	@ApiNotFoundResponse({ description: "Team not found" })
	async findUniqueTeamById(@Param() param: FindUniqueTeamByIdParams) {
		const result = await this.teamService.getTeamById(param.id);
		if (result) return result;
		throw new NotFoundException("Team not found");
	}

	@Get("")
	@PaginatedSwaggerDocs(Team, TEAM_PAGINATION_CONFIG)
	async findAllTeams(@Paginate() query: PaginateQuery) {
		return await this.teamService.getAllTeams(query);
	}

	@Post("")
	async createTeam(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
		return await this.teamService.createTeam(createTeamDto);
	}

	@Put(":id")
	async updateEntireTeam(@Param() param: FindUniqueTeamByIdParams) {}

	@Patch(":id")
	async updatePartialTeam(@Param() param: FindUniqueTeamByIdParams) {}

	@Delete(":id")
	async deleteTeam(@Param() param: FindUniqueTeamByIdParams) {}
}
