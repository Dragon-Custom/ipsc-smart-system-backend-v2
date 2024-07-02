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
	IsDateString,
	IsInt,
	IsOptional,
	IsString,
} from "class-validator";
import {
	Match,
	MatchClassification,
	MatchDivision,
	MatchShooter,
	MatchStaff,
	MatchStage,
	Score,
} from "src/entities";

export class MatchDto extends Match {
	@ApiProperty({
		description: "Id of the match",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@ApiProperty({
		description: "Name of the match",
		example: "Match 1",
	})
	@Type(() => String)
	@IsString()
	name: string;

	@ApiPropertyOptional({
		description: "The description of the match",
		example: "This is the first match of the competition",
	})
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty({
		description: "Level of the match",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	level: number;

	@ApiPropertyOptional({
		description: "Link of the match",
		example: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	})
	@Type(() => String)
	@IsOptional()
	@IsString()
	link?: string;

	@ApiProperty({
		description: "Date of the match",
		example: "2022-01-01T00:00:00.000Z",
	})
	@IsDateString()
	matchDate: Date;

	@ApiProperty({
		description: "Is stage DQ enabled for the match",
		example: true,
	})
	@Type(() => Boolean)
	@IsBoolean()
	isStageDQEnabled: boolean;

	@ApiProperty({
		description: "Date of creation of the match",
		example: "2022-01-01T00:00:00.000Z",
	})
	@IsDateString()
	createdAt: Date;

	@ApiProperty({
		description: "Is the match finished",
		example: false,
	})
	@Type(() => Boolean)
	@IsBoolean()
	isFinished: boolean;

	@ApiProperty({
		description: "How many staff are in this match",
		example: 10,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly matchStaffCount: number;

	@ApiProperty({
		description: "How many match shooters are in this match",
		example: 10,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly matchShooterCount: number;

	@ApiProperty({
		description: "How many match stages are in this match",
		example: 10,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly matchStageCount: number;

	//TODO: relation
	matchStaffs?: MatchStaff[];

	@ApiPropertyOptional({
		description: "Id of the staffs of the match",
		example: [1, 2, 3],
		readOnly: true,
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly matchStaffIds?: number[];

	//TODO: relation
	matchShooters: MatchShooter[];

	@ApiPropertyOptional({
		description: "Id of the match shooters",
		example: [1, 2, 3],
		readOnly: true,
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly matchShooterIds: number[];

	//TODO: relation
	matchStages: MatchStage[];

	@ApiPropertyOptional({
		description: "Id of the match stages",
		example: [1, 2, 3],
		readOnly: true,
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly matchStageIds: number[];

	//TODO: relation
	matchDivisions: MatchDivision[];

	@ApiProperty({
		description: "Divisions' id of the match",
		example: [1, 2, 3],
	})
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly matchDivisionIds: number[];

	//TODO: relation
	matchClassifications?: MatchClassification[];

	@ApiPropertyOptional({
		description: "Id of the classification of the match",
		example: [1, 2, 3],
		readOnly: true,
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly matchClassificationIds?: number[];

	//TODO: relation
	scores?: Score[];

	@ApiPropertyOptional({
		description: "Id of the scores of the match",
		example: [1, 2, 3],
		readOnly: true,
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly scoresId?: number[];
}

export class MatchCreateDto extends PickType(MatchDto, [
	"name",
	"description",
	"isStageDQEnabled",
	"level",
	"link",
	"matchDate",
	"matchStages",
	"matchStaffs",
] as const) {}

export class MatchUpdateDto extends PartialType(MatchCreateDto) {}

export class MatchIdDto extends PickType(MatchDto, ["id"] as const) {}