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
import { ShootersService } from "./shooters.service";
import { CreateShooterDto } from "./dto/create-shooter.dto";
import { UpdateShooterDto } from "./dto/update-shooter.dto";
import { ApiNotFoundResponse } from "@nestjs/swagger";
import { NumericIdParams } from "src/utils";

@Controller("shooters")
export class ShootersController {
	constructor(private readonly shootersService: ShootersService) {}

	@Post()
	create(@Body() createShooterDto: CreateShooterDto) {
		return this.shootersService.create(createShooterDto);
	}

	@Get()
	async findAll() {
		return await this.shootersService.findAll();
	}

	@Get(":id")
	@ApiNotFoundResponse({ description: "Shooter not found" })
	async findOne(@Param() param: NumericIdParams) {
		const result = await this.shootersService.findOne(+param.id);
		if (result) return result;
		else throw new NotFoundException("Shooter not found");
	}

	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateShooterDto: UpdateShooterDto,
	) {
		return this.shootersService.update(+id, updateShooterDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.shootersService.remove(+id);
	}
}
