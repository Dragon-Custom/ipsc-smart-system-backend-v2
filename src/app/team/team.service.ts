import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
	PaginateConfig,
	PaginateQuery,
	Paginated,
	paginate,
} from "nestjs-paginate";
import { Team, User } from "src/entities";
import { NumbericFilterPresets, StringFilterPresets } from "src/lib";
import { Repository } from "typeorm";
import { CreateTeamDto } from "./dto/create-team.dto";

export const TEAM_PAGINATION_CONFIG: PaginateConfig<Team> = {
	sortableColumns: ["id", "name"],
	nullSort: "last",
	defaultSortBy: [["id", "DESC"]],
	searchableColumns: ["name", "id", "membersCount"],
	filterableColumns: {
		id: NumbericFilterPresets,
		name: StringFilterPresets,
		membersCount: NumbericFilterPresets,
	},
};

@Injectable()
export class TeamService {
	constructor(
		@InjectRepository(Team)
		private repo: Repository<Team>,
	) {}

	async getTeamById(id: number): Promise<Team | null> {
		return await this.repo.findOne({
			where: { id },
		});
	}

	async getAllTeams(query: PaginateQuery): Promise<Paginated<Team>> {
		return await paginate(query, this.repo, TEAM_PAGINATION_CONFIG);
	}

	async createTeam(data: CreateTeamDto): Promise<Team> {
		const newTeam = this.repo.create(data);
		newTeam.name = data.name;
		newTeam.description = data.description;
		const owner = await this.repo.manager.findOneBy(User, {
			id: data.ownerId,
		});
		if (!owner) throw new NotFoundException("Owner not found");
		newTeam.owner = owner;
		return await this.repo.save(newTeam);
	}
}
