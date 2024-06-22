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
		return "This action adds a new shooter";
	}

	findAll() {
		return this.shooterRepo.find();
	}

	findOne(params: FindUniqueShooterArgs) {
		return this.shooterRepo.findOne({
			where: {
				belongsUser: {
					id: params.belongsUserId,
				},
				id: params.id,
			},
		});
	}

	update(id: number, updateShooterInput: UpdateShooterInput) {
		return `This action updates a #${id} shooter`;
	}

	remove(id: number) {
		return `This action removes a #${id} shooter`;
	}
}
