import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	NotFoundException,
	UseGuards,
	Request,
	UnauthorizedException,
	UseFilters,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto, UserResponseDTO } from "./dto";
import {
	ApiNotFoundResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthGuard, RequestWithUserAuthInfo } from "../auth/auth.guard";
import { TypeOrmFilter } from "src/exceptionFilters";
import { NumericIdParams } from "src/utils";

@ApiTags("users")
@Controller("users")
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@UseFilters(TypeOrmFilter)
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
	@ApiUnauthorizedResponse({
		description: "You are not authorized to update this user",
	})
	@UseGuards(AuthGuard)
	async update(
		@Request() request: RequestWithUserAuthInfo,
		@Param() param: NumericIdParams,
		@Body() updateUserDto: UpdateUserDto,
	) {
		if (request.user.sub !== param.id) {
			throw new UnauthorizedException(
				"You are not authorized to update this user",
			);
		}
		const reuslt = await this.userService.update(param.id, updateUserDto);
		if (reuslt.affected > 0) {
			return;
		} else {
			throw new NotFoundException("User not found");
		}
	}

	@Delete(":id")
	@ApiUnauthorizedResponse({
		description: "You are not authorized to delete this user",
	})
	@ApiNotFoundResponse({ description: "User not found" })
	@UseGuards(AuthGuard)
	async remove(
		@Request() request: RequestWithUserAuthInfo,
		@Param() param: NumericIdParams,
	) {
		if (request.user.sub !== param.id) {
			throw new UnauthorizedException(
				"You are not authorized to delete this user",
			);
		}
		const result = await this.userService.remove(param.id);
		if (result.affected > 0) {
			return;
		} else {
			throw new NotFoundException("User not found");
		}
	}
}
