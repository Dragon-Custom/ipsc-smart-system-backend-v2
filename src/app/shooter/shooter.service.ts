import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Shooter } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class ShooterService {
	constructor(
		@InjectRepository(Shooter) private repository: Repository<Shooter>,
	) {}

	async getShooterById(id: number): Promise<Shooter | null> {
		return await this.repository.findOneBy({ id });
	}
}
