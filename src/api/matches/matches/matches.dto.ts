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
	IsObject,
	IsOptional,
	IsString,
	ValidateNested,
} from "class-validator";
import {
	Match,
	MatchClassification,
	MatchDivision,
	MatchShooter,
	MatchStaff,
	MatchStage,
	Score,
	User,
} from "src/entities";
import { MatchStaffIdDto } from "../match-staffs/match-staffs.dto";
import { MatchShooterIdDto } from "../match-shooters/match-shooters.dto";
import { MatchStageIdDto } from "../match-stages/match-stages.dto";
import { MatchDivisionIdDto } from "../match-divisions/match-divisions.dto";
import { MatchClassificationIdDto } from "../match-classifications/match-classifications.dto";
import { ScoreIdDto } from "../scores/scores.dto";
import { UserIdDto } from "../../users/users.dto";

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

	matchShooters?: MatchShooter[];

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

	matchStages?: MatchStage[];

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

	matchDivisions?: MatchDivision[];

	@ApiProperty({
		description: "Divisions' id of the match",
		example: [1, 2, 3],
	})
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly matchDivisionIds: number[];

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

	organizer: User;

	@ApiProperty({
		description: "Id of the organize user of the match",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly organizerId: number;

	@ApiProperty({
		description: "Score count of the match",
		example: 10,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly scoreCount: number;

	@ApiPropertyOptional({
		description: "Score ids of the match",
		example: [1, 2, 3],
		readOnly: true,
	})
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	scoreIds?: number[];
}

export class CreateMatchDto extends PickType(MatchDto, [
	"name",
	"description",
	"isStageDQEnabled",
	"level",
	"link",
	"scores",
	"matchDate",
	"matchShooters",
	"matchDivisions",
	"matchClassifications",
	"matchStages",
	"matchStaffs",
	"organizer",
] as const) {
	@ApiPropertyOptional({
		description: "match staffs",
		type: () => [MatchStaffIdDto],
	})
	@IsOptional()
	@IsArray()
	@IsObject({ each: true })
	@ValidateNested({ each: true })
	@Type(() => MatchStaffIdDto)
	matchStaffs?: MatchStaff[];

	@ApiPropertyOptional({
		description: "match shooters",
		type: () => [MatchShooterIdDto],
	})
	@IsOptional()
	@IsArray()
	@IsObject({ each: true })
	@ValidateNested({ each: true })
	@Type(() => MatchShooterIdDto)
	matchShooters?: MatchShooter[];

	@ApiPropertyOptional({
		description: "match stages",
		type: () => [MatchStageIdDto],
	})
	@IsOptional()
	@IsArray()
	@IsObject({ each: true })
	@ValidateNested({ each: true })
	@Type(() => MatchStageIdDto)
	matchStages?: MatchStage[];

	@ApiPropertyOptional({
		description: "match divisions",
		type: () => [MatchDivisionIdDto],
	})
	@IsOptional()
	@IsArray()
	@IsObject({ each: true })
	@ValidateNested({ each: true })
	@Type(() => MatchDivisionIdDto)
	matchDivisions?: MatchDivision[];

	@ApiPropertyOptional({
		description: "match classifications",
		type: () => [MatchClassificationIdDto],
	})
	@IsOptional()
	@IsArray()
	@IsObject({ each: true })
	@ValidateNested({ each: true })
	@Type(() => MatchClassificationIdDto)
	matchClassifications?: MatchClassification[];

	@ApiPropertyOptional({
		description: "scores",
		type: () => [ScoreIdDto],
	})
	@IsOptional()
	@IsArray()
	@IsObject({ each: true })
	@ValidateNested({ each: true })
	@Type(() => ScoreIdDto)
	scores?: Score[];

	@ApiProperty({
		description: "organizer of the match",
		type: () => UserIdDto,
	})
	@IsObject()
	@ValidateNested()
	@Type(() => UserIdDto)
	organizer: User;
}

export class UpdateMatchDto extends PartialType(CreateMatchDto) {}

export class MatchIdDto extends PickType(MatchDto, ["id"] as const) {}
