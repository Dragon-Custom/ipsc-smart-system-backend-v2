import {
	ApiProperty,
	ApiPropertyOptional,
	PartialType,
	PickType,
} from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString } from "class-validator";
import { Match, MatchClassification, MatchShooter } from "src/entities";

export class MatchClassificationDto extends MatchClassification {
	@ApiProperty({
		description: "Match classification id",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@ApiProperty({
		description: "Match classification name",
		example: "First",
	})
	@IsString()
	name: string;

	//TODO: relation
	matchShooters?: MatchShooter[];

	@ApiPropertyOptional({
		description: "Shooter's id that are in this classification",
		example: [1, 2, 3],
		readOnly: true,
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly matchShooterIds?: number[];

	//TODO: relation
	match: Match;

	@ApiProperty({
		description: "Match id",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly matchId: number;
}

export class CreateMatchClassificationDto extends PickType(
	MatchClassificationDto,
	["name", "match"] as const,
) {}

export class UpdateMatchClassificationDto extends PartialType(
	CreateMatchClassificationDto,
) {}

export class MatchClassificationIdDto extends PickType(MatchClassificationDto, [
	"id",
] as const) {}
