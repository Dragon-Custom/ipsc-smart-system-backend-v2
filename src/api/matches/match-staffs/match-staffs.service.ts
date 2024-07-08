import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { MatchStaff } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class MatchStaffsService extends TypeOrmCrudService<MatchStaff> {
	constructor(@InjectRepository(MatchStaff) repo: Repository<MatchStaff>) {
		super(repo);
	}
}
