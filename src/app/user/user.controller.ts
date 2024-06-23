import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { USER_PAGINATION_CONFIG, UserService } from "./user.service";
import { IsInt } from "class-validator";
import { Type, plainToInstance } from "class-transformer";
import { ApiNotFoundResponse, ApiProperty, ApiTags } from "@nestjs/swagger";
import { UserDTO } from "./dto";
import {
	Paginate,
	PaginateQuery,
	Paginated,
	PaginatedSwaggerDocs,
} from "nestjs-paginate";

export class FindUniqueUserByIdParams {
	@ApiProperty()
	@Type(() => Number)
	@IsInt()
	id: number;
}

@ApiTags("users")
@Controller("users")
export class UserController {
	constructor(public readonly userService: UserService) {}

	@Get(":id")
	@ApiNotFoundResponse({ description: "User not found" })
	async getUserById(
		@Param() param: FindUniqueUserByIdParams,
	): Promise<UserDTO> {
		const user = await this.userService.getUserById(param.id);
		if (user) return user;
		else throw new NotFoundException("User not found");
	}

	@Get()
	@PaginatedSwaggerDocs(UserDTO, USER_PAGINATION_CONFIG)
	async getAllUsers(
		@Paginate() query: PaginateQuery,
	): Promise<Paginated<UserDTO>> {
		const reuslt = await this.userService.getAllUsers(query);
		console.log(reuslt);
		return plainToInstance(
			Paginated<UserDTO>,
			await this.userService.getAllUsers(query),
		);
	}
}
