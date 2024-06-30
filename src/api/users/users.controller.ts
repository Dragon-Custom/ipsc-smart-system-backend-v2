import { Controller } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { User } from "src/entities";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto, UpdateUserDto, UserDto } from "./user.dto";
import { mixinCrudConfig } from "src/types";

@Controller("users")
@ApiTags("users")
@Crud(
	mixinCrudConfig({
		model: {
			type: UserDto,
		},
		dto: {
			create: CreateUserDto,
			update: UpdateUserDto,
			replace: CreateUserDto,
		},
	}),
)
export class UsersController implements CrudController<User> {
	constructor(public service: UsersService) {}
}
