import {
	ApiProperty,
	ApiPropertyOptional,
	PartialType,
	PickType,
} from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional } from "class-validator";
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

	//TODO: relation
	division: MatchDivision;

	@ApiProperty({
		description: "Id of the division of the match shooter",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly divisionId: number;

	//TODO: relation
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

	//TODO: relation
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

	//TODO: relation
	match: Match;

	@ApiProperty({
		description: "Id of the match shooter is a part of",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly matchId: number;

	//TODO: relation
	shooter: Shooter;

	@ApiProperty({
		description: "Id of the shooter of the match shooter",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly shooterId: number;

	//TODO: relation
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

const CreateMatchShooterPickBase = [
	"shooter",
	"squad",
	"match",
	"categories",
	"classification",
	"powerFactor",
	"division",
] as const;

export class MatchShooterCreateDto extends PickType(
	MatchShooterDto,
	CreateMatchShooterPickBase,
) {}

export class MatchShooterUpdateDto extends PartialType(
	PickType(MatchShooterDto, [
		...CreateMatchShooterPickBase,
		"isDQed",
	] as const),
) {}

export class MatchShooterIdDto extends PickType(MatchShooterDto, [
	"id",
] as const) {}
