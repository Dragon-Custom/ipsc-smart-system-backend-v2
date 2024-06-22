import { Injectable } from "@nestjs/common";
import { CreateShooterInput, UpdateShooterInput } from "./dto";
import { Repository } from "typeorm";
import { Shooter } from "src/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Either } from "src/types";

export interface FindUniqueShooterById {
	id: number;
}
export interface FindUniqueShooterByBelongsUserId {
	belongsUserId: number;
}

export type FindUniqueShooterArgs = Either<
	FindUniqueShooterById,
	FindUniqueShooterByBelongsUserId
>;
@Injectable()
export class ShooterService {
	constructor(
		@InjectRepository(Shooter)
		private shooterRepo: Repository<Shooter>,
	) {}

	getRelations(id: number, relations: string[]) {
		return this.shooterRepo.findOne({
			where: { id },
			relations,
		});
	}

	create(createShooterInput: CreateShooterInput) {
		return this.shooterRepo.save({
			firstName: createShooterInput.firstName,
			lastName: createShooterInput.lastName,
			belongsUser: {
				id: createShooterInput.belongsUserId,
			},
		});
	}

	findAll() {
		return this.shooterRepo.find();
	}

	findOne(params: FindUniqueShooterArgs) {
		return this.shooterRepo.findOneBy({
			id: params.id,
			belongsUser: {
				id: params.belongsUserId,
			},
		});
	}

	async update(
		searchArgs: FindUniqueShooterArgs,
		updateShooterInput: UpdateShooterInput,
	) {
		let shooter = await this.findOne(searchArgs);
		if (!shooter) return null;
		shooter = {
			...shooter,
			...updateShooterInput,
		};
		return await this.shooterRepo.save(shooter);
	}

	async remove(searchArgs: FindUniqueShooterArgs) {
		const shooter = await this.findOne(searchArgs);
		if (!shooter) return null;
		const result = await this.shooterRepo.remove(shooter);
		return { ...shooter, ...result, ...searchArgs };
	}
}
