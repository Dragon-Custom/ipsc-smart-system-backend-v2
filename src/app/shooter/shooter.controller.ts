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
import {
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiProperty,
	ApiTags,
} from "@nestjs/swagger";
import { SHOOTER_PAGINATION_CONFIG, ShooterService } from "./shooter.service";
import { Type, plainToInstance } from "class-transformer";
import { IsInt } from "class-validator";
import { CreateShooterDto, UpdateShooterDto } from "./dto";
import {
	Paginate,
	PaginateQuery,
	Paginated,
	PaginatedSwaggerDocs,
} from "nestjs-paginate";
import { Shooter } from "src/entities";

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
	): Promise<Shooter> {
		const shooter = await this.shooterService.getShooterById(params.id);
		if (shooter) return shooter;
		throw new NotFoundException("Shooter not found");
	}

	@Get()
	@PaginatedSwaggerDocs(Shooter, SHOOTER_PAGINATION_CONFIG)
	async getAllShooters(
		@Paginate() query: PaginateQuery,
	): Promise<Paginated<Shooter>> {
		return await this.shooterService.getAllShooters(query);
	}

	@Post()
	@ApiOkResponse({ description: "Shooter created successfully" })
	async createShooter(
		@Body() createShooterData: CreateShooterDto,
	): Promise<Shooter> {
		return plainToInstance(
			Shooter,
			await this.shooterService.createShooter(createShooterData),
		);
	}

	@Put(":id")
	@ApiOkResponse({ description: "Shooter updated successfully" })
	@ApiNotFoundResponse({ description: "Shooter not found" })
	async updateEntireShooter(
		@Param() param: FindUniqueShooterByIdParams,
		@Body() shooterData: CreateShooterDto,
	): Promise<Shooter> {
		const result = await this.shooterService.updateShooter(
			param.id,
			shooterData,
		);
		return result;
	}

	@Patch(":id")
	@ApiOkResponse({ description: "Shooter updated successfully" })
	@ApiNotFoundResponse({ description: "Shooter not found" })
	async updateShooter(
		@Param() param: FindUniqueShooterByIdParams,
		@Body() shooterData: UpdateShooterDto,
	): Promise<Shooter> {
		const result = await this.shooterService.updateShooter(
			param.id,
			shooterData,
		);
		return result;
	}

	@Delete(":id")
	@ApiOkResponse({ description: "Shooter deleted successfully" })
	@ApiNotFoundResponse({ description: "Shooter not found" })
	async deleteShooter(
		@Param() param: FindUniqueShooterByIdParams,
	): Promise<Shooter> {
		const result = await this.shooterService.deleteShooter(param.id);
		return result;
	}
}
