import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { MatchDivision } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class MatchDivisionsService extends TypeOrmCrudService<MatchDivision> {
	constructor(
		@InjectRepository(MatchDivision) repo: Repository<MatchDivision>,
	) {
		super(repo);
	}
}
