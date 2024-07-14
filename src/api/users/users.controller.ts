import { Controller } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { User } from "src/entities";
import { mixinCrudConfig } from "src/utils";
import { CreateUserDto, UpdateUserDto, UserDto } from "./users.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("users")
@ApiTags("users")
@Crud(
	mixinCrudConfig({
		model: {
			type: UserDto,
		},
		dto: {
			create: CreateUserDto,
			replace: CreateUserDto,
			update: UpdateUserDto,
		},
	}),
)
export class UsersController implements CrudController<User> {
	constructor(public service: UsersService) {}
}
