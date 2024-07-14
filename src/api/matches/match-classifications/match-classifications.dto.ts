import {
	ApiProperty,
	ApiPropertyOptional,
	PartialType,
	PickType,
} from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
	IsArray,
	IsInt,
	IsObject,
	IsOptional,
	IsString,
	ValidateNested,
} from "class-validator";
import { Match, MatchClassification, MatchShooter } from "src/entities";
import { MatchShooterIdDto } from "../match-shooters/match-shooters.dto";
import { MatchIdDto } from "../matches/matches.dto";

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

	@ApiProperty({
		description: "Number of shooter in this classification",
		example: 3,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly matchShooterCount: number;

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
	["name", "matchShooters", "match"] as const,
) {
	@ApiPropertyOptional({
		description: "Match shooters",
		type: () => [MatchShooterIdDto],
	})
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@IsObject({ each: true })
	@Type(() => MatchShooterIdDto)
	matchShooters?: MatchShooter[];

	@ApiProperty({
		description: "Match",
		type: () => MatchIdDto,
	})
	@IsObject()
	@ValidateNested()
	@Type(() => MatchIdDto)
	match: Match;
}

export class UpdateMatchClassificationDto extends PartialType(
	CreateMatchClassificationDto,
) {}

export class MatchClassificationIdDto extends PickType(MatchClassificationDto, [
	"id",
] as const) {}
