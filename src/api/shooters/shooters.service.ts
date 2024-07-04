import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Shooter } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class ShootersService extends TypeOrmCrudService<Shooter> {
	constructor(
		@InjectRepository(Shooter) shooterRepositoy: Repository<Shooter>,
	) {
		super(shooterRepositoy);
	}
}
