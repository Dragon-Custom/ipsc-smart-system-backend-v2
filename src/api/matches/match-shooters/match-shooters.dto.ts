import {
	ApiProperty,
	ApiPropertyOptional,
	PartialType,
	PickType,
} from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsInt,
	IsObject,
	IsOptional,
	ValidateNested,
} from "class-validator";
import {
	MatchClassification,
	MatchDivision,
	Match,
	MatchShooter,
	MatchShooterCategory,
	Shooter,
	PowerFactor,
	Score,
} from "src/entities";
import { MatchDivisionIdDto } from "../match-divisions/match-divisions.dto";
import { MatchClassificationIdDto } from "../match-classifications/match-classifications.dto";
import { MatchShooterCategoryIdDto } from "../match-shooter-categories/match-shooter-categories.dto";
import { MatchIdDto } from "../matches.dto";
import { ShooterIdDto } from "src/api/shooters/shooters.dto";
import { ScoreIdDto } from "../scores/scores.dto";
export class MatchShooterDto extends MatchShooter {
	@ApiProperty({
		description: "Id of the match shooter",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@ApiProperty({
		description: "Squad number of the match shooter",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	squad: number;

	division: MatchDivision;

	@ApiProperty({
		description: "Id of the division of the match shooter",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly divisionId: number;

	classification: MatchClassification;

	@ApiProperty({
		description: "Id of the classification of the match shooter",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly classificationId: number;

	@ApiProperty({
		description: "Power factor of the match shooter",
		example: PowerFactor.Major,
	})
	@IsEnum(PowerFactor)
	powerFactor: PowerFactor;

	@ApiProperty({
		description: "Is the match shooter DQed",
		example: true,
	})
	@Type(() => Boolean)
	@IsBoolean()
	isDQed: boolean;

	categories?: MatchShooterCategory[];

	@ApiPropertyOptional({
		description: "Id of the categories of the match shooter",
		example: [1, 2, 3],
		readOnly: true,
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly categoryIds?: number[];

	match: Match;

	@ApiProperty({
		description: "Id of the match shooter is a part of",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly matchId: number;

	shooter: Shooter;

	@ApiProperty({
		description: "Id of the shooter of the match shooter",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly shooterId: number;

	scores?: Score[];

	@ApiPropertyOptional({
		description: "Id of the scores of the match shooter",
		example: [1, 2, 3],
		readOnly: true,
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly scoresId?: number[];
}

export class CreateMatchShooterDto extends PickType(MatchShooterDto, [
	"shooter",
	"squad",
	"match",
	"categories",
	"classification",
	"powerFactor",
	"division",
	"isDQed",
] as const) {
	@ApiProperty({
		description: "division of the match shooter",
		type: () => MatchDivisionIdDto,
	})
	@IsObject()
	@ValidateNested()
	@Type(() => MatchDivisionIdDto)
	division: MatchDivision;

	@ApiProperty({
		description: "classification of the match shooter",
		type: () => MatchClassificationIdDto,
	})
	@IsObject()
	@ValidateNested()
	@Type(() => MatchClassificationIdDto)
	classification: MatchClassification;

	@ApiPropertyOptional({
		description: "categories of the match shooter",
		type: () => [MatchShooterCategoryIdDto],
	})
	@IsOptional()
	@IsArray()
	@IsObject({ each: true })
	@ValidateNested({ each: true })
	@Type(() => MatchShooterCategoryIdDto)
	categories?: MatchShooterCategory[];

	@ApiProperty({
		description: "match of the match shooter",
		type: () => MatchIdDto,
	})
	@IsObject()
	@ValidateNested()
	@Type(() => MatchIdDto)
	match: Match;

	@ApiProperty({
		description: "shooter of the match shooter",
		type: () => ShooterIdDto,
	})
	@IsObject()
	@ValidateNested()
	@Type(() => ShooterIdDto)
	shooter: Shooter;

	@ApiPropertyOptional({
		description: "scores of the match shooter",
		type: () => [ScoreIdDto],
	})
	@IsOptional()
	@IsArray()
	@IsObject({ each: true })
	@ValidateNested({ each: true })
	@Type(() => ScoreIdDto)
	scores?: Score[];
}

export class UpdateMatchShooterDto extends PartialType(CreateMatchShooterDto) {}

export class MatchShooterIdDto extends PickType(MatchShooterDto, [
	"id",
] as const) {}
