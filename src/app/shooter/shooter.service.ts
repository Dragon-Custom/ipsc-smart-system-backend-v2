import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
	FilterOperator,
	FilterSuffix,
	PaginateConfig,
	PaginateQuery,
	Paginated,
	paginate,
} from "nestjs-paginate";
import { Shooter, Team } from "src/entities";
import { Repository } from "typeorm";
import { CreateShooterDto, UpdateShooterDto } from "./dto";

export const SHOOTER_PAGINATION_CONFIG: PaginateConfig<Shooter> = {
	sortableColumns: [
		"id",
		"belongsUserId",
		"fullName",
		"firstName",
		"lastName",
		"teamId",
	],
	nullSort: "last",
	defaultSortBy: [["id", "DESC"]],
	searchableColumns: [
		"id",
		"belongsUserId",
		"fullName",
		"firstName",
		"lastName",
		"teamId",
	],
	filterableColumns: {
		firstName: [
			FilterOperator.EQ,
			FilterSuffix.NOT,
			FilterOperator.CONTAINS,
			FilterOperator.SW,
			FilterOperator.ILIKE,
		],
		lastName: [
			FilterOperator.EQ,
			FilterSuffix.NOT,
			FilterOperator.CONTAINS,
			FilterOperator.SW,
			FilterOperator.ILIKE,
		],
		fullName: [
			FilterOperator.EQ,
			FilterSuffix.NOT,
			FilterOperator.CONTAINS,
			FilterOperator.SW,
			FilterOperator.ILIKE,
		],
		teamId: [FilterOperator.EQ, FilterSuffix.NOT],
		belongsUserId: [FilterOperator.EQ, FilterSuffix.NOT],
		id: [
			FilterOperator.EQ,
			FilterSuffix.NOT,
			FilterOperator.GT,
			FilterOperator.LT,
			FilterOperator.IN,
			FilterOperator.BTW,
		],
	},
};

@Injectable()
export class ShooterService {
	constructor(
		@InjectRepository(Shooter) private repository: Repository<Shooter>,
	) {}

	async getShooterById(id: number): Promise<Shooter> {
		const shooter = await this.repository.findOneBy({ id });
		if (!shooter) throw new NotFoundException("Shooter not found");
		return shooter;
	}

	async getAllShooters(query: PaginateQuery): Promise<Paginated<Shooter>> {
		return paginate(query, this.repository, SHOOTER_PAGINATION_CONFIG);
	}

	async createShooter(data: CreateShooterDto): Promise<Shooter> {
		const shooter = new Shooter();
		shooter.firstName = data.firstName;
		shooter.lastName = data.lastName;
		if (data.teamId) {
			const team = await this.repository.manager.findOneBy(Team, {
				id: data.teamId,
			});
			if (team) shooter.team = team;
			else throw new NotFoundException("Team not found");
		}
		return await this.repository.save(shooter, {
			reload: true,
			listeners: true,
		});
	}

	async updateShooter(id: number, data: UpdateShooterDto): Promise<Shooter> {
		const shooter = await this.getShooterById(id);
		if (!shooter) throw new NotFoundException("Shooter not found");
		if (data.firstName) shooter.firstName = data.firstName;
		if (data.lastName) shooter.lastName = data.lastName;
		console.log(data.teamId);
		if (data.teamId) {
			const team = await this.repository.manager.findOneBy(Team, {
				id: data.teamId,
			});
			console.log(team);
			if (team) shooter.team = team;
			else throw new NotFoundException("Team not found");
		} else if (data.teamId === 0) {
			shooter.team = undefined;
		}
		return await this.repository.save(shooter, {
			reload: true,
			listeners: true,
		});
	}

	async deleteShooter(id: number): Promise<Shooter> {
		const shooter = await this.getShooterById(id);
		if (!shooter) throw new NotFoundException("Shooter not found");
		await this.repository.softRemove({
			id,
		});
		return shooter;
	}
}
