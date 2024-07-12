import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { MatchStage } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class MatchStagesService extends TypeOrmCrudService<MatchStage> {
	constructor(@InjectRepository(MatchStage) repo: Repository<MatchStage>) {
		super(repo);
	}
}
