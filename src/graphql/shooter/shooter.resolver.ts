import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ShooterService } from "./shooter.service";
import { CreateShooterInput, UpdateShooterInput } from "./dto";
import { Shooter } from "src/entities";

@Resolver(() => Shooter)
export class ShooterResolver {
	constructor(private readonly shooterService: ShooterService) {}

	@Mutation(() => Shooter)
	createShooter(@Args("data") data: CreateShooterInput) {
		return this.shooterService.create(data);
	}

	@Query(() => [Shooter], { name: "shooters" })
	findAll() {
		return this.shooterService.findAll();
	}

	@Query(() => Shooter, { name: "shooter" })
	findOne(@Args("id", { type: () => Int }) id: number) {
		return this.shooterService.findOne(id);
	}

	@Mutation(() => Shooter)
	updateShooter(
		@Args("updateShooterInput") updateShooterInput: UpdateShooterInput,
	) {
		return this.shooterService.update(
			updateShooterInput.id,
			updateShooterInput,
		);
	}

	@Mutation(() => Shooter)
	removeShooter(@Args("id", { type: () => Int }) id: number) {
		return this.shooterService.remove(id);
	}
}
