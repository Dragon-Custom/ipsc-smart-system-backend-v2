import { Controller } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { User } from "src/entities";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto, UpdateUserDto, UserDto } from "./user.dto";

@Controller("users")
@ApiTags("users")
@Crud({
	model: {
		type: UserDto,
	},
	query: {
		persist: ["id"],
	},
	validation: {
		always: true,
		strictGroups: true,
		transform: true,
	},
	dto: {
		create: CreateUserDto,
		update: UpdateUserDto,
		replace: CreateUserDto,
	},
})
export class UsersController implements CrudController<User> {
	constructor(public service: UsersService) {}
}
