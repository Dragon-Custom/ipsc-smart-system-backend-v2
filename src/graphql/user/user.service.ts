import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { Repository } from "typeorm";
import { User } from "src/entities";
import { Either } from "src/types";
import { InjectRepository } from "@nestjs/typeorm";
import config from "src/config";
import { createHash } from "crypto";

export interface FindOneUserById {
	id: number;
}

export interface FindOneUserByEmail {
	email: string;
}

export interface FindOneUserByName {
	name: string;
}

export type FindUniqueUserArgs = Either<
	FindOneUserById,
	Either<FindOneUserByEmail, FindOneUserByName>
>;

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepo: Repository<User>,
	) {}

	encryptePassword(password: string) {
		// add secret key
		password = password + config.security.passwordSalt;
		// sha256 hash
		const firstResult = createHash("sha512")
			.update(password)
			.digest("base64");
		// add secret key
		password = config.security.passwordSalt + firstResult;
		// sha512 hash
		const secondResult = createHash("sha512")
			.update(password)
			.digest("base64");

		return secondResult;
	}

	async create(createUserInput: CreateUserInput) {
		const result = await this.userRepo.save({
			email: createUserInput.email,
			nickname: createUserInput.nickname,
			encryptedPassword: this.encryptePassword(createUserInput.password),
		});
		return result;
	}

	findAll() {
		return this.userRepo.find();
	}

	findOne(searchArgs: FindUniqueUserArgs) {
		return this.userRepo.findOneBy({
			id: searchArgs.id,
			email: searchArgs.email,
		});
	}

	async update(
		searchArgs: FindUniqueUserArgs,
		updateUserInput: UpdateUserInput,
	) {
		let user = await this.findOne(searchArgs);
		if (!user) return null;
		const { password, ...newValues } = updateUserInput;
		user = {
			...user,
			...newValues,
			...{
				encryptedPassword: password
					? this.encryptePassword(password)
					: user.encryptedPassword,
			},
		};
		return await this.userRepo.save(user);
	}

	async remove(searchArgs: FindUniqueUserArgs) {
		const user = await this.findOne(searchArgs);
		if (!user) return null;
		const result = await this.userRepo.remove(user);
		return { ...user, ...result, ...searchArgs };
	}
}
