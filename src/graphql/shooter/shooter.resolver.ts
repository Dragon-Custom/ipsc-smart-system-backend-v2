import {
	Resolver,
	Query,
	Mutation,
	Args,
	Int,
	ResolveField,
	Parent,
	InputType,
	Field,
} from "@nestjs/graphql";
import { FindUniqueShooterArgs, ShooterService } from "./shooter.service";
import { CreateShooterInput, UpdateShooterInput } from "./dto";
import { Shooter } from "src/entities";
import { BadRequestException } from "@nestjs/common";

@InputType()
export class FindUniqueShooterInput {
	@Field(() => Int, { nullable: true })
	id?: number;

	@Field(() => Int, { nullable: true })
	belongsUserId?: number;
}

@Resolver(() => Shooter)
export class ShooterResolver {
	constructor(private readonly shooterService: ShooterService) {}

	extractFindUniqueShooterArgs(
		shooter: FindUniqueShooterInput,
	): FindUniqueShooterArgs {
		if (shooter.id) return { id: shooter.id };
		if (shooter.belongsUserId)
			return { belongsUserId: shooter.belongsUserId };
		throw new BadRequestException("Invalid search parameters");
	}

	@ResolveField(() => Shooter)
	async belongsUser(@Parent() shooter: Shooter) {
		return (
			await this.shooterService.getRelations(shooter.id, ["belongsUser"])
		).belongsUser;
	}

	@Mutation(() => Shooter)
	createShooter(@Args("data") data: CreateShooterInput) {
		return this.shooterService.create(data);
	}

	@Query(() => [Shooter], { name: "shooters" })
	findAll() {
		return this.shooterService.findAll();
	}

	@Query(() => Shooter, { name: "shooter", nullable: true })
	findOne(
		@Args("shooter", { type: () => FindUniqueShooterInput })
		shooter: FindUniqueShooterInput,
	) {
		return this.shooterService.findOne(
			this.extractFindUniqueShooterArgs(shooter),
		);
	}

	@Mutation(() => Shooter)
	updateShooter(
		@Args("shooter", { type: () => FindUniqueShooterInput })
		shooter: FindUniqueShooterInput,
		@Args("data") data: UpdateShooterInput,
	) {
		return this.shooterService.update(
			this.extractFindUniqueShooterArgs(shooter),
			data,
		);
	}

	@Mutation(() => Shooter)
	removeShooter(
		@Args("shooter", { type: () => FindUniqueShooterInput })
		shooter: FindUniqueShooterInput,
	) {
		return this.shooterService.remove(
			this.extractFindUniqueShooterArgs(shooter),
		);
	}
}
