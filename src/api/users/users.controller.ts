import { Controller } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { User } from "src/entities";
import { mixinCrudConfig, AuthPreset } from "src/utils";
import { CreateUserDto, UpdateUserDto, UserDto } from "./users.dto";
import { ApiTags } from "@nestjs/swagger";
import { CreateAuthRouteGroup } from "src/utils";

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
		routes: CreateAuthRouteGroup([...AuthPreset.U, ...AuthPreset.D]),
	}),
)
export class UsersController implements CrudController<User> {
	constructor(public service: UsersService) {}
}
