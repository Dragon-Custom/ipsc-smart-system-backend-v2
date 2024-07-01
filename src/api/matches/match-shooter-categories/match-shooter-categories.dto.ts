import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsString } from "class-validator";
import { MatchShooterCategory } from "src/entities";

export class MatchShooterCategoriesDto extends MatchShooterCategory {
	@ApiProperty({
		description: "Match Shooter Category ID",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@ApiProperty({
		description: "Match Shooter Category Name",
		example: "Category 1",
	})
	@IsString()
	name: string;

	@ApiProperty({
		description: "Shooter's id that are in this category",
		example: "This is the first category",
	})
	@IsArray()
	readonly matchShootersIds: number[];
}

export class CreateMatchShooterCategoryDto extends PickType(
	MatchShooterCategoriesDto,
	["name"] as const,
) {}

export class UpdateMatchShooterCategoryDto extends PartialType(
	MatchShooterCategoriesDto,
) {}
