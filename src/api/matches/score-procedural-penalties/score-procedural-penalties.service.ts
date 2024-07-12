import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ScoreProceduralPenalty } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class ScoreProceduralPenaltiesService extends TypeOrmCrudService<ScoreProceduralPenalty> {
	constructor(
		@InjectRepository(ScoreProceduralPenalty)
		repo: Repository<ScoreProceduralPenalty>,
	) {
		super(repo);
	}
}
