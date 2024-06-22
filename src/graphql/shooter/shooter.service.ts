import { Injectable } from "@nestjs/common";
import { CreateShooterInput, UpdateShooterInput } from "./dto";
import { Repository } from "typeorm";
import { Shooter } from "src/entities";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ShooterService {
	constructor(
		@InjectRepository(Shooter)
		private shooterRepo: Repository<Shooter>,
	) {}

	create(createShooterInput: CreateShooterInput) {
		return "This action adds a new shooter";
	}

	findAll() {
		return this.shooterRepo.find();
	}

	findOne(id: number) {
		return `This action returns a #${id} shooter`;
	}

	update(id: number, updateShooterInput: UpdateShooterInput) {
		return `This action updates a #${id} shooter`;
	}

	remove(id: number) {
		return `This action removes a #${id} shooter`;
	}
}
