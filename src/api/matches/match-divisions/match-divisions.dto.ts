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
import { Match, MatchDivision, MatchShooter } from "src/entities";
import { MatchShooterIdDto } from "../match-shooters/match-shooters.dto";
import { MatchIdDto } from "../matches/matches.dto";

export class MatchDivisionsDto extends MatchDivision {
	@ApiProperty({
		description: "Match division id",
		example: 1,
		uniqueItems: true,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@ApiProperty({
		description: "Match division name",
		example: "Division 1",
	})
	@IsString()
	name: string;

	matchShooters?: MatchShooter[];

	@ApiPropertyOptional({
		description: "THe shooter's id which are in this division",
		example: [1, 2, 3],
		readOnly: true,
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly matchShooterIds?: number[];

	@ApiProperty({
		description: "The number of shooter in this division",
		example: 3,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly matchShooterCount: number;

	match: Match;

	@ApiProperty({
		description: "The match id",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly matchId: number;
}

export class CreateMatchDivisionDto extends PickType(MatchDivisionsDto, [
	"name",
	"matchShooters",
	"match",
] as const) {
	@ApiPropertyOptional({
		description: "The shooter's id which are in this division",
		type: () => [MatchShooterIdDto],
	})
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@IsObject({ each: true })
	@Type(() => MatchShooterIdDto)
	matchShooters?: MatchShooter[];

	@ApiProperty({
		description: "The match id",
		type: () => MatchIdDto,
	})
	@ValidateNested()
	@IsObject()
	@Type(() => MatchIdDto)
	match: Match;
}

export class UpdateMatchDivisionDto extends PartialType(MatchDivisionsDto) {}

export class MatchDivisionIdDto extends PickType(MatchDivisionsDto, [
	"id",
] as const) {}
