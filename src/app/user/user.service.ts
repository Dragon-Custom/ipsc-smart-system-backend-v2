import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DataSource } from "typeorm";
import { User } from "src/entities";
import config from "src/config";
import { createHash } from "crypto";

export interface SearchByID {
	id: number;
}
export interface SearchByEmail {
	email: string;
}
export interface SearchByNickname {
	nickname: string;
}
type Only<T, U> = {
	[P in keyof T]: T[P];
} & {
	[P in keyof U]?: never;
};

type Either<T, U> = Only<T, U> | Only<U, T>;
export type UserSearchParams = Either<
	SearchByID,
	Either<SearchByEmail, SearchByNickname>
>;

@Injectable()
export class UserService {
	constructor(private dataSource: DataSource) {}

	encryptePassword(password: string) {
		// add secret key
		password = password + config.api.passwordOption.encryptSecret;
		// sha256 hash
		const firstResult = createHash("sha512")
			.update(password)
			.digest("base64");
		// add secret key
		password = config.api.passwordOption.encryptSecret + firstResult;
		// sha256 hash
		const secondResult = createHash("sha512")
			.update(password)
			.digest("base64");

		return secondResult;
	}

	async create(createUserDto: CreateUserDto) {
		const result = await this.dataSource.manager.insert(User, {
			email: createUserDto.email,
			nickname: createUserDto.nickname,
			encryptedPassword: this.encryptePassword(createUserDto.password),
		});
		return {
			...(result.generatedMaps[0] as {
				id: number;
				createdAt: Date;
				isActive: boolean;
				isBanned: boolean;
			}),
			...createUserDto,
		};
	}

	async findAll() {
		return await this.dataSource.manager.find(User);
	}

	async findOne(searchParam: UserSearchParams) {
		return await this.dataSource.manager.findOne(User, {
			where: {
				...searchParam,
			},
		});
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		return await this.dataSource.manager.update(User, id, {
			email: updateUserDto.email,
			nickname: updateUserDto.nickname,
			encryptedPassword: updateUserDto.password
				? this.encryptePassword(updateUserDto.password)
				: undefined,
		});
	}

	async remove(id: number) {
		return await this.dataSource.manager.delete(User, id);
	}
}
