import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Match } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class MatchesService extends TypeOrmCrudService<Match> {
	constructor(@InjectRepository(Match) repo: Repository<Match>) {
		super(repo);
	}
}
