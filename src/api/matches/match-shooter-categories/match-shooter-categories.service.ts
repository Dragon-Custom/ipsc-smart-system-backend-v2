import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { MatchShooterCategory } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class MatchShooterCategoriesService extends TypeOrmCrudService<MatchShooterCategory> {
	constructor(
		@InjectRepository(MatchShooterCategory)
		private readonly matchShooterCategoryRepository: Repository<MatchShooterCategory>,
	) {
		super(matchShooterCategoryRepository);
	}
}
