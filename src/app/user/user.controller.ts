import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	NotFoundException,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto, UserResponseDTO } from "./dto";
import { IsInt } from "class-validator";
import { ApiNotFoundResponse, ApiProperty, ApiTags } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class NumericIdParams {
	@Type(() => Number)
	@IsInt()
	@ApiProperty()
	id: number;
}

@ApiTags("user")
@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async create(
		@Body() createUserDto: CreateUserDto,
	): Promise<UserResponseDTO> {
		const result = await this.userService.create(createUserDto);
		delete result.password;
		return result;
	}

	@Get()
	async findAll(): Promise<UserResponseDTO[]> {
		const result = await this.userService.findAll();
		return result.map((user) => {
			delete user.encryptedPassword;
			return user;
		});
	}

	@Get(":id")
	@ApiNotFoundResponse({ description: "User not found" })
	async findOne(@Param() param: NumericIdParams): Promise<UserResponseDTO> {
		const reuslt = await this.userService.findOne({
			id: param.id,
		});
		if (reuslt) {
			delete reuslt.encryptedPassword;
			return reuslt;
		} else {
			throw new NotFoundException("User not found");
		}
	}

	@Patch(":id")
	@ApiNotFoundResponse({ description: "User not found" })
	async update(
		@Param() param: NumericIdParams,
		@Body() updateUserDto: UpdateUserDto,
	) {
		const reuslt = await this.userService.update(param.id, updateUserDto);
		if (reuslt.affected > 0) {
			return;
		} else {
			throw new NotFoundException("User not found");
		}
	}

	@Delete(":id")
	@ApiNotFoundResponse({ description: "User not found" })
	async remove(@Param() param: NumericIdParams) {
		const result = await this.userService.remove(param.id);
		if (result.affected > 0) {
			return;
		} else {
			throw new NotFoundException("User not found");
		}
	}
}
