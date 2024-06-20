import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DataSource, FindOneOptions } from "typeorm";
import { User } from "src/entities";
import config from "src/config";
import { createHash } from "crypto";
import { Either } from "src/utils";

export interface SearchByID {
	id: number;
}
export interface SearchByEmail {
	email: string;
}
export interface SearchByNickname {
	nickname: string;
}
export interface SearchByShooterId {
	shooterId: number;
}
export type UserSearchParams = Either<
	SearchByID,
	Either<SearchByEmail, Either<SearchByNickname, SearchByShooterId>>
>;

@Injectable()
export class UsersService {
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
		let where: FindOneOptions<User> = {};
		if ("id" in searchParam) where = { where: { id: searchParam.id } };
		else if ("email" in searchParam)
			where = { where: { email: searchParam.email } };
		else if ("nickname" in searchParam)
			where = { where: { nickname: searchParam.nickname } };
		else if ("shooterId" in searchParam)
			where = {
				where: { shooterProfile: { id: searchParam.shooterId } },
			};
		return await this.dataSource.manager.findOne(User, {
			...where,
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
