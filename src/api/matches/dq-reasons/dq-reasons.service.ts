import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { DQReason } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class DqReasonsService extends TypeOrmCrudService<DQReason> {
	constructor(@InjectRepository(DQReason) repo: Repository<DQReason>) {
		super(repo);
	}
}
