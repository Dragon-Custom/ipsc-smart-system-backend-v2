import { Injectable } from "@nestjs/common";
import { CreateShooterDto } from "./dto/create-shooter.dto";
import { UpdateShooterDto } from "./dto/update-shooter.dto";
import { DataSource } from "typeorm";
import { Shooter } from "src/entities";

@Injectable()
export class ShootersService {
	constructor(private dataSource: DataSource) {}

	async create(createShooterDto: CreateShooterDto) {
		const result = await this.dataSource.manager.insert(Shooter, {
			belongsUser: {
				id: createShooterDto.belongsUserId,
			},
			firstName: createShooterDto.firstName,
			lastName: createShooterDto.lastName,
			team: createShooterDto.teamId
				? {
						id: createShooterDto.teamId,
					}
				: undefined,
		});
		return result;
	}

	async findAll() {
		return await this.dataSource.manager.find(Shooter);
	}

	async findOne(id: number, relations: string[] = []) {
		return await this.dataSource.manager.findOne(Shooter, {
			where: { id },
			relations: [...relations],
		});
	}

	update(id: number, updateShooterDto: UpdateShooterDto) {
		const result = this.dataSource.manager.update(Shooter, id, {
			firstName: updateShooterDto.firstName,
			lastName: updateShooterDto.lastName,
			team: updateShooterDto.teamId
				? {
						id: updateShooterDto.teamId,
					}
				: undefined,
		});
		return result;
	}

	remove(id: number) {
		return this.dataSource.manager.delete(Shooter, id);
	}
}
