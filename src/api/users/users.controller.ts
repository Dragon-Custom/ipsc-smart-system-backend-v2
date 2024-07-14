import { Controller, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { User } from "src/entities";
import {
	CreateRouteGroup,
	mixinCrudConfig,
	RouteOperationPreset,
} from "src/utils";
import { CreateUserDto, UpdateUserDto, UserDto } from "./users.dto";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { IsUserItselfGuard } from "./users.guard";

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
		routes: CreateRouteGroup([
			{
				route: [...RouteOperationPreset.U, ...RouteOperationPreset.D],
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
