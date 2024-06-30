import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { User } from "src/entities";

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
	constructor(@InjectRepository(User) repo) {
		super(repo);
	}
}
