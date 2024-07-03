import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Team } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class TeamsService extends TypeOrmCrudService<Team> {
	constructor(
		@InjectRepository(Team)
		teamRepository: Repository<Team>,
	) {
		super(teamRepository);
	}
}
