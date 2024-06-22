import {
	Resolver,
	Query,
	Mutation,
	Args,
	Int,
	InputType,
	Field,
	ResolveField,
	Parent,
} from "@nestjs/graphql";
import { FindUniqueUserArgs, UserService } from "./user.service";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "src/entities";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { isEmail, isInt } from "class-validator";

@InputType()
export class FindUniqueUserInput {
	@Field(() => Int, { nullable: true })
	id?: number;

	@Field(() => String, { nullable: true })
	email?: string;
}

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	extractFindOneUserArgs(user: FindUniqueUserInput): FindUniqueUserArgs {
		let searchArgs: FindUniqueUserArgs | undefined;
		if (isInt(user.id)) {
			searchArgs = { id: user.id };
		} else if (isEmail(user.email)) {
			searchArgs = { email: user.email };
		} else {
			throw new BadRequestException("Invalid search parameters");
		}
		return searchArgs;
	}

	@ResolveField(() => User)
	async shooterProfile(@Parent() user: User) {
		return (
			await this.userService.getRelations(user.id, ["shooterProfile"])
		).shooterProfile;
	}

	@Mutation(() => User)
	async createUser(@Args("data") data: CreateUserInput) {
		return await this.userService.create(data);
	}

	@Query(() => [User], { name: "users" })
	findAll() {
		return this.userService.findAll();
	}

	@Query(() => User, { name: "user", nullable: true })
	findOne(@Args("user") user: FindUniqueUserInput) {
		return this.userService.findOne(this.extractFindOneUserArgs(user));
	}

	@Mutation(() => User)
	async updateUser(
		@Args("user") user: FindUniqueUserInput,
		@Args("data") data: UpdateUserInput,
	) {
		const result = await this.userService.update(
			this.extractFindOneUserArgs(user),
			data,
		);
		if (result) return result;
		throw new NotFoundException("User not found");
	}

	@Mutation(() => User)
	async removeUser(@Args("user") user: FindUniqueUserInput) {
		const result = await this.userService.remove(
			this.extractFindOneUserArgs(user),
		);
		if (result) return result;
		throw new NotFoundException("User not found");
	}
}
