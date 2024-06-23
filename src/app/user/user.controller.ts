import {
	Body,
	Controller,
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
import { ApiNotFoundResponse, ApiProperty, ApiTags } from "@nestjs/swagger";
import { CreateUserDTO, UserDTO } from "./dto";
import {
	Paginate,
	PaginateQuery,
	Paginated,
	PaginatedSwaggerDocs,
} from "nestjs-paginate";
import { UpdateUserDto } from "./dto/updateUser.dto";

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
		return plainToInstance(
			Paginated<UserDTO>,
			await this.userService.getAllUsers(query),
		);
	}

	@Post()
	async createUser(@Body() createUserData: CreateUserDTO): Promise<UserDTO> {
		return await this.userService.createUser(createUserData);
	}

	@Put(":id")
	async updateEntireUser(
		@Param() param: FindUniqueUserByIdParams,
		@Body() userData: CreateUserDTO,
	) {
		return await this.userService.updateUser(param.id, userData);
	}

	@Patch(":id")
	async updateUser(
		@Param() param: FindUniqueUserByIdParams,
		@Body() userData: UpdateUserDto,
	) {
		return await this.userService.updateUser(param.id, userData);
	}
}
