import { ApiProperty, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";
import { Shooter } from "src/entities";

export class ShooterDto extends PickType(Shooter, [
	"id",
	"firstName",
	"lastName",
	"fullName",
	"teamId",
	"belongsUserId",
	"createdAt",
] as const) {
	@ApiProperty()
	@Type(() => Number)
	@IsInt()
	id: number;

	@ApiProperty()
	@IsString()
	firstName: string;

	@ApiProperty()
	@IsString()
	lastName: string;

	@ApiProperty()
	@IsString()
	fullName: string;

	@ApiProperty()
	@Type(() => Number)
	@IsOptional()
	@IsInt()
	belongsUserId?: number = undefined;

	@ApiProperty({
		description: "set it to 0 to unbound the shooter from a team",
	})
	@Type(() => Number)
	@IsOptional()
	@IsInt()
	teamId?: number = undefined;

	@ApiProperty()
	@IsDateString()
	createdAt: Date;
}
