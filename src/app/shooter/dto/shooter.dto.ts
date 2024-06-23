import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsDateString, IsInt, IsString } from "class-validator";
import { Shooter } from "src/entities";
import { IsNullable } from "src/lib";

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
	@IsInt()
	@IsNullable()
	belongsUserId?: number | null = null;

	@ApiProperty()
	@IsInt()
	@IsNullable()
	teamId: number;

	@ApiProperty()
	@IsDateString()
	createdAt: Date;
}
