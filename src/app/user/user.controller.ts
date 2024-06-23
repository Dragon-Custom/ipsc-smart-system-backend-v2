import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Put,
} from "@nestjs/common";
import { USER_PAGINATION_CONFIG, UserService } from "./user.service";
import { IsInt } from "class-validator";
import { Type, plainToInstance } from "class-transformer";
import {
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiProperty,
	ApiTags,
} from "@nestjs/swagger";
import { CreateUserDto, UserDto } from "./dto";
import {
	Paginate,
	PaginateQuery,
	Paginated,
	PaginatedSwaggerDocs,
} from "nestjs-paginate";
import { UpdateUserDto } from "./dto";

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
	): Promise<UserDto> {
		const user = await this.userService.getUserById(param.id);
		if (user) return user;
		else throw new NotFoundException("User not found");
	}

	@Get()
	@PaginatedSwaggerDocs(UserDto, USER_PAGINATION_CONFIG)
	async getAllUsers(
		@Paginate() query: PaginateQuery,
	): Promise<Paginated<UserDto>> {
		return plainToInstance(
			Paginated<UserDto>,
			await this.userService.getAllUsers(query),
		);
	}

	@Post()
	@ApiOkResponse({ description: "User created successfully" })
	async createUser(@Body() createUserData: CreateUserDto): Promise<UserDto> {
		return await this.userService.createUser(createUserData);
	}

	@Put(":id")
	@ApiOkResponse({ description: "User updated successfully" })
	@ApiNotFoundResponse({ description: "User not found" })
	async updateEntireUser(
		@Param() param: FindUniqueUserByIdParams,
		@Body() userData: CreateUserDto,
	) {
		const result = await this.userService.updateUser(param.id, userData);
		if (result) return result;
		else throw new NotFoundException("User not found");
	}

	@Patch(":id")
	@ApiOkResponse({ description: "User updated successfully" })
	@ApiNotFoundResponse({ description: "User not found" })
	async updateUser(
		@Param() param: FindUniqueUserByIdParams,
		@Body() userData: UpdateUserDto,
	) {
		const result = await this.userService.updateUser(param.id, userData);
		if (result) return result;
		else throw new NotFoundException("User not found");
	}

	@Delete(":id")
	@ApiOkResponse({ description: "User deleted successfully" })
	@ApiNotFoundResponse({ description: "User not found" })
	async deleteUser(@Param() param: FindUniqueUserByIdParams) {
		const result = await this.userService.deleteUser(param.id);
		if (result) return result;
		else throw new NotFoundException("User not found");
	}
}
