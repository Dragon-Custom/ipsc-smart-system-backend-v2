import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { CreateShooterDto } from "./dto/create-shooter.dto";
import { UpdateShooterDto } from "./dto/update-shooter.dto";
import { DataSource, FindOneOptions } from "typeorm";
import { Shooter } from "src/entities";
import { Either } from "src/utils";
import { UsersService } from "../user";

export interface ShooterSearchByID {
	id: number;
}
export interface ShooterSearchByFullName {
	fullName: string;
}
export interface ShooterSearchByUserID {
	userId: number;
}
export type ShooterSearchParams = Either<
	ShooterSearchByID,
	Either<ShooterSearchByFullName, ShooterSearchByUserID>
>;

@Injectable()
export class ShootersService {
	constructor(
		private dataSource: DataSource,
		@Inject(forwardRef(() => UsersService))
		private userService: UsersService,
	) {}

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

	async findOne(searchParam: ShooterSearchParams, relations: string[] = []) {
		let where: FindOneOptions<Shooter> = {};
		if ("id" in searchParam) where = { where: { id: searchParam.id } };
		else if ("fullName" in searchParam)
			where = {
				where: {
					fullName: searchParam.fullName,
				},
			};
		else if ("userId" in searchParam)
			where = {
				where: {
					belongsUser: {
						id: searchParam.userId,
					},
				},
			};
		return await this.dataSource.manager.findOne(Shooter, {
			where: { ...where.where },
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

	async findUser(id: number) {
		return await this.userService.findOne({ shooterId: id });
	}
}
