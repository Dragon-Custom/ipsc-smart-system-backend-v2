import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Image, Stage } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class StagesService extends TypeOrmCrudService<Stage> {
	constructor(@InjectRepository(Stage) public repo: Repository<Stage>) {
		super(repo);
	}
}
