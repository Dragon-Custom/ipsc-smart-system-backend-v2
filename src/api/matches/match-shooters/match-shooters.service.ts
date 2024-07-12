import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { MatchShooter } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class MatchShootersService extends TypeOrmCrudService<MatchShooter> {
	constructor(
		@InjectRepository(MatchShooter) repo: Repository<MatchShooter>,
	) {
		super(repo);
	}
}
