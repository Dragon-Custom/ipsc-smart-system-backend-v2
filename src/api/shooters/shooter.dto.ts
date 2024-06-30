import {
	ApiProperty,
	ApiPropertyOptional,
	PartialType,
	PickType,
} from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";
import { Shooter } from "src/entities";

export class ShooterDto extends Shooter {
	@Exclude()
	deletedAt: Date;
}

export class CreateShooterDto extends PickType(ShooterDto, [
	"firstName",
	"lastName",
	"belongsUserId",
	"teamId",
] as const) {
	@ApiProperty({
		description: "The shooter's first name",
		example: "John",
		type: "string",
		required: true,
	})
	@IsString()
	firstName: string;

	@ApiProperty({
		description: "The shooter's last name",
		example: "Doe",
		type: "string",
		required: true,
	})
	@IsString()
	lastName: string;

	@ApiPropertyOptional({
		description: "The ID of the team the shooter belongs to",
		example: 1,
		type: "number",
		required: false,
	})
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	teamId?: number;
}

export class UpdateShooterDto extends PartialType(ShooterDto) {}
