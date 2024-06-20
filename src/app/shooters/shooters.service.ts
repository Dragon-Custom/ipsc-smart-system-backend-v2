import { Injectable } from "@nestjs/common";
import { CreateShooterDto } from "./dto/create-shooter.dto";
import { UpdateShooterDto } from "./dto/update-shooter.dto";
import { DataSource } from "typeorm";
import { Shooter } from "src/entities";

@Injectable()
export class ShootersService {
	constructor(private dataSource: DataSource) {}

	create(createShooterDto: CreateShooterDto) {
		return "This action adds a new shooter";
	}

	findAll() {
		return `This action returns all shooters`;
	}

	async findOne(id: number) {
		return await this.dataSource.manager.findOne(Shooter, {
			where: { id },
		});
	}

	update(id: number, updateShooterDto: UpdateShooterDto) {
		return `This action updates a #${id} shooter`;
	}

	remove(id: number) {
		return `This action removes a #${id} shooter`;
	}
}
