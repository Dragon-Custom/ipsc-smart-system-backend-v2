import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { MatchShooterCategory } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class MatchShooterCategoriesService extends TypeOrmCrudService<MatchShooterCategory> {
	constructor(
		@InjectRepository(MatchShooterCategory)
		repo: Repository<MatchShooterCategory>,
	) {
		super(repo);
	}
}
