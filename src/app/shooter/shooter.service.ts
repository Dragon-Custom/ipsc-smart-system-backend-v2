import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
	FilterOperator,
	FilterSuffix,
	PaginateConfig,
	PaginateQuery,
	Paginated,
	paginate,
} from "nestjs-paginate";
import { Shooter } from "src/entities";
import { Repository } from "typeorm";

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
	},
};

@Injectable()
export class ShooterService {
	constructor(
		@InjectRepository(Shooter) private repository: Repository<Shooter>,
	) {}

	async getShooterById(id: number): Promise<Shooter | null> {
		return await this.repository.findOneBy({ id });
	}

	async getAllShooters(query: PaginateQuery): Promise<Paginated<Shooter>> {
		return paginate(query, this.repository, SHOOTER_PAGINATION_CONFIG);
	}
}
