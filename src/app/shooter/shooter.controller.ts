import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { ApiNotFoundResponse, ApiProperty, ApiTags } from "@nestjs/swagger";
import { SHOOTER_PAGINATION_CONFIG, ShooterService } from "./shooter.service";
import { Type, plainToInstance } from "class-transformer";
import { IsInt } from "class-validator";
import { ShooterDto } from "./dto";
import {
	Paginate,
	PaginateQuery,
	Paginated,
	PaginatedSwaggerDocs,
} from "nestjs-paginate";

export class FindUniqueShooterByIdParams {
	@ApiProperty()
	@Type(() => Number)
	@IsInt()
	id: number;
}

@ApiTags("shooters")
@Controller("shooters")
export class ShooterController {
	constructor(private readonly shooterService: ShooterService) {}

	@Get(":id")
	@ApiNotFoundResponse({ description: "Shooter not found" })
	async getShooterById(
		@Param() params: FindUniqueShooterByIdParams,
	): Promise<ShooterDto> {
		const shooter = await this.shooterService.getShooterById(params.id);
		if (shooter) return shooter;
		throw new NotFoundException("Shooter not found");
	}

	@Get()
	@PaginatedSwaggerDocs(ShooterDto, SHOOTER_PAGINATION_CONFIG)
	async getAllShooters(
		@Paginate() query: PaginateQuery,
	): Promise<Paginated<ShooterDto>> {
		return plainToInstance(
			Paginated<ShooterDto>,
			await this.shooterService.getAllShooters(query),
		);
	}
}
