import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateShooterDto {
	@ApiProperty()
	@IsString()
	firstName: string;

	@ApiProperty()
	@IsString()
	lastName: string;

	@ApiProperty()
	@Type(() => Number)
	@IsInt()
	@Max(Number.MAX_SAFE_INTEGER)
	@Min(1)
	belongsUserId: number;

	@ApiProperty()
	@IsOptional()
	@IsInt()
	@Max(Number.MAX_SAFE_INTEGER)
	@Min(1)
	teamId?: number;
}
