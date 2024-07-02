import {
	ApiProperty,
	ApiPropertyOptional,
	PartialType,
	PickType,
} from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString } from "class-validator";
import { Match, MatchDivision, MatchShooter } from "src/entities";

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

	//TODO: relation
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

	//TODO: relation
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
	"match",
] as const) {}

export class UpdateMatchDivisionDto extends PartialType(MatchDivisionsDto) {}

export class MatchDivisionIdDto extends PickType(MatchDivisionsDto, [
	"id",
] as const) {}
