import { Injectable } from "@nestjs/common";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Stage } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class StagesService extends TypeOrmCrudService<Stage> {
	constructor(
		@InjectRepository(Stage) private stageRepository: Repository<Stage>,
	) {
		super(stageRepository);
	}
}
