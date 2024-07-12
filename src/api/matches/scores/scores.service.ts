import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Score } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class ScoresService extends TypeOrmCrudService<Score> {
	constructor(@InjectRepository(Score) repo: Repository<Score>) {
		super(repo);
	}
}
