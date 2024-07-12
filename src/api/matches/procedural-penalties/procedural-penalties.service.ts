import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ProceduralPenalty } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class ProceduralPenaltiesService extends TypeOrmCrudService<ProceduralPenalty> {
	constructor(
		@InjectRepository(ProceduralPenalty)
		repo: Repository<ProceduralPenalty>,
	) {
		super(repo);
	}
}
