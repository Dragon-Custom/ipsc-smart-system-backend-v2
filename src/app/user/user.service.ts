import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entities";
import {
	FilterOperator,
	FilterSuffix,
	PaginateConfig,
	PaginateQuery,
	Paginated,
	paginate,
} from "nestjs-paginate";
import { CreateUserDTO } from "./dto";

export const USER_PAGINATION_CONFIG: PaginateConfig<User> = {
	sortableColumns: ["id", "nickname", "email", "shooterProfileId"],
	nullSort: "last",
	defaultSortBy: [["id", "DESC"]],
	searchableColumns: ["nickname", "id", "shooterProfileId", "email"],
	filterableColumns: {
		nickname: [FilterOperator.EQ, FilterSuffix.NOT],
		createdAt: [
			FilterOperator.GTE,
			FilterOperator.LTE,
			FilterSuffix.NOT,
			FilterOperator.BTW,
		],
	},
};

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private repository: Repository<User>) {}

	async getUserById(id: number): Promise<User | null> {
		return this.repository.findOneBy({ id });
	}

	async getAllUsers(query: PaginateQuery): Promise<Paginated<User>> {
		return paginate(query, this.repository, USER_PAGINATION_CONFIG);
	}

	async createUser(data: CreateUserDTO): Promise<User> {
		const user = new User();
		user.email = data.email;
		user.password = data.password;
		user.nickname = data.nickname;
		return await this.repository.save(user);
	}
}
