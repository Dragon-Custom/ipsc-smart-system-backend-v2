import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	NotFoundException,
	Request,
	UnauthorizedException,
	UseGuards,
	ClassSerializerInterceptor,
	UseInterceptors,
	SerializeOptions,
} from "@nestjs/common";
import { ShootersService } from "./shooters.service";
import { CreateShooterDto } from "./dto/create-shooter.dto";
import { UpdateShooterDto } from "./dto/update-shooter.dto";
import { ApiNotFoundResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { NumericIdParams } from "src/utils";
import { AuthGuard, RequestWithUserAuthInfo } from "../auth";
import { Shooter } from "src/entities";

@Controller("shooters")
export class ShootersController {
	constructor(private readonly shootersService: ShootersService) {}

	@Post()
	create(@Body() createShooterDto: CreateShooterDto) {
		return this.shootersService.create(createShooterDto);
	}

	@Get()
	@SerializeOptions({})
	async findAll() {
		return await this.shootersService.findAll();
	}

	@Get(":id")
	@ApiNotFoundResponse({ description: "Shooter not found" })
	@SerializeOptions({})
	async findOne(@Param() param: NumericIdParams): Promise<Shooter> {
		const result = await this.shootersService.findOne(+param.id);
		if (result) return result;
		else throw new NotFoundException("Shooter not found");
	}

	@Patch(":id")
	@SerializeOptions({})
	@ApiNotFoundResponse({ description: "Shooter not found" })
	@ApiUnauthorizedResponse({
		description: "You are not authorized to update this shooter",
	})
	@UseGuards(AuthGuard)
	update(
		@Request() req: RequestWithUserAuthInfo,
		@Param()
		param: NumericIdParams,
		@Body() updateShooterDto: UpdateShooterDto,
	) {
		if (req.user.sub !== param.id)
			throw new UnauthorizedException(
				"You are not authorized to update this shooter",
			);
		return this.shootersService.update(+param.id, updateShooterDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.shootersService.remove(+id);
	}
}
