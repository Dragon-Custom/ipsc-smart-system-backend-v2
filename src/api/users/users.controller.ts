import { Controller } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { User } from "src/entities";
import { ApiTags } from "@nestjs/swagger";

@Controller("users")
@ApiTags("users")
@Crud({
	model: {
		type: User,
	},
	query: {
		persist: ["id"],
	},
})
export class UsersController implements CrudController<User> {
	constructor(public service: UsersService) {}
}
