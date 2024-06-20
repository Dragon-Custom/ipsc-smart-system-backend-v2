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
	SerializeOptions,
	BadRequestException,
} from "@nestjs/common";
import { ShootersService } from "./shooters.service";
import { CreateShooterDto } from "./dto/create-shooter.dto";
import { UpdateShooterDto } from "./dto/update-shooter.dto";
import { ApiNotFoundResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { NumericIdParams } from "src/utils";
import { AuthGuard, RequestWithUserAuthInfo } from "../auth";
import { ShooterResponseDTO } from "./dto/shooter-response.dto";
import { InsertResult } from "typeorm";

@Controller("shooters")
export class ShootersController {
	constructor(private readonly shootersService: ShootersService) {}

	@Post()
	@SerializeOptions({})
	async create(
		@Body() createShooterDto: CreateShooterDto,
	): Promise<ShooterResponseDTO> {
		let result: InsertResult;
		try {
			result = await this.shootersService.create(createShooterDto);
		} catch (error) {
			throw new BadRequestException(
				"User non-exist or already owns a shooter profile",
			);
		}
		if (result.generatedMaps.length > 0)
			return {
				...(result.generatedMaps[0] as {
					id: number;
					fullName: string;
					createdAt: Date;
				}),
				...createShooterDto,
			};
	}

	@Get()
	@SerializeOptions({})
	async findAll(): Promise<ShooterResponseDTO[]> {
		return await this.shootersService.findAll();
	}

	@Get(":id")
	@ApiNotFoundResponse({ description: "Shooter not found" })
	@SerializeOptions({})
	async findOne(
		@Param() param: NumericIdParams,
	): Promise<ShooterResponseDTO> {
		const result = await this.shootersService.findOne(+param.id);
		if (result) return result;

		throw new NotFoundException("Shooter not found");
	}

	@Patch(":id")
	@SerializeOptions({})
	@ApiNotFoundResponse({ description: "Shooter not found" })
	@ApiUnauthorizedResponse({
		description: "You are not authorized to update this shooter",
	})
	@UseGuards(AuthGuard)
	async update(
		@Request() req: RequestWithUserAuthInfo,
		@Param()
		param: NumericIdParams,
		@Body() updateShooterDto: UpdateShooterDto,
	) {
		const shooter = await this.shootersService.findOne(+param.id, [
			"belongsUser",
		]);
		if (req.user.sub !== shooter.belongsUser.id)
			throw new UnauthorizedException(
				"You are not authorized to update this shooter",
			);
		const result = await this.shootersService.update(
			+param.id,
			updateShooterDto,
		);
		if (result.affected > 0) return;
		throw new NotFoundException("Shooter not found");
	}

	@Delete(":id")
	@SerializeOptions({})
	@ApiNotFoundResponse({ description: "Shooter not found" })
	@ApiUnauthorizedResponse({
		description: "You are not authorized to delete this shooter",
	})
	@UseGuards(AuthGuard)
	async remove(
		@Request() req: RequestWithUserAuthInfo,
		@Param() param: NumericIdParams,
	) {
		const shooter = await this.shootersService.findOne(+param.id, [
			"belongsUser",
		]);
		if (!shooter?.belongsUser?.id)
			throw new NotFoundException("Shooter not found");
		if (req.user.sub !== shooter.belongsUser.id)
			throw new UnauthorizedException(
				"You are not authorized to delete this shooter",
			);
		const result = await this.shootersService.remove(+param.id);
		if (result.affected > 0) return;
		throw new NotFoundException("Shooter not found");
	}
}
