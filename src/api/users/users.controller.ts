import { Controller, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { User } from "src/entities";
import { mixinCrudConfig, AuthPreset } from "src/utils";
import { CreateUserDto, UpdateUserDto, UserDto } from "./users.dto";
import { ApiTags } from "@nestjs/swagger";
import { CreateAuthRouteGroup } from "src/utils";
import { IsUserItselfGuard } from "../authorize/authorize.guard";
import { AuthGuard } from "../auth/auth.guard";

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
		routes: CreateAuthRouteGroup([
			{
				route: [...AuthPreset.U, ...AuthPreset.D],
				options: {
					decorators: [UseGuards(AuthGuard, IsUserItselfGuard)],
				},
			},
		]),
	}),
)
export class UsersController implements CrudController<User> {
	constructor(public service: UsersService) {}
}
