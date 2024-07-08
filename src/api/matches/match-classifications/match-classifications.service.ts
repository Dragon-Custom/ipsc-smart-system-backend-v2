import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { MatchClassification } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class MatchClassificationsService extends TypeOrmCrudService<MatchClassification> {
	constructor(
		@InjectRepository(MatchClassification)
		repo: Repository<MatchClassification>,
	) {
		super(repo);
	}
}
