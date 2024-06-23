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
import { CreateUserDto, UpdateUserDto } from "./dto";

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

	async createUser(data: CreateUserDto): Promise<User> {
		const user = new User();
		user.email = data.email;
		user.password = data.password;
		user.nickname = data.nickname;
		return await this.repository.save(user);
	}

	async updateUser(id: number, data: UpdateUserDto): Promise<User | null> {
		const user = await this.getUserById(id);
		if (!user) return null;
		if (data.email) user.email = data.email;
		if (data.password) {
			//* the @BeforeUpdate() hook won't work here due to a typeorm bug
			//* https://github.com/typeorm/typeorm/issues/5493
			//* so we need to manually encrypt the password
			user.encryptedPassword = user.encryptePassword(
				data.password,
				user.passwordSalt,
			);
			user.password = data.password;
		}
		if (data.nickname) user.nickname = data.nickname;
		return await this.repository.save(user, {
			reload: true,
			listeners: true,
		});
	}

	async deleteUser(id: number): Promise<User | null> {
		const user = await this.getUserById(id);
		if (!user) return null;
		await this.repository.softRemove({
			id,
		});
		return user;
	}
}
