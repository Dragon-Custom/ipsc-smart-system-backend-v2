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
	IsEnum,
	IsInt,
	IsOptional,
	IsString,
} from "class-validator";
import { MatchStage, Score, Stage, StageType, User } from "src/entities";

export class StageDto extends Stage {
	@ApiProperty({
		description: "Id of the stage",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@ApiProperty({
		description: "Name of the stage",
		example: "Stage 1",
	})
	@Type(() => String)
	@IsString()
	name: string;

	@ApiPropertyOptional({
		description: "Description of the stage",
		example: "This is the first stage of the competition",
	})
	@Type(() => String)
	@IsOptional()
	@IsString()
	description?: string;

	@ApiPropertyOptional({
		description: "Briefing of the stage",
		example:
			"This stage will test the shooter's skills in a simulated environment",
	})
	@Type(() => String)
	@IsOptional()
	@IsString()
	briefing?: string;

	@ApiProperty({
		description: "Pappers count of the stage",
		example: 10,
	})
	@Type(() => Number)
	@IsInt()
	papers: number;

	@ApiProperty({
		description: "No shoots count of the stage",
		example: 5,
	})
	@Type(() => Number)
	@IsInt()
	noShoots: number;

	@ApiProperty({
		description: "Poppers count of the stage",
		example: 2,
	})
	@Type(() => Number)
	@IsInt()
	poppers: number;

	@ApiProperty({
		description: "Condition of the stage",
		example: 5,
	})
	@Type(() => Number)
	@IsInt()
	condidtion: number;

	@ApiProperty({
		description: "Walkthrough time of the stage (in seconds)",
		example: 100,
	})
	@Type(() => Number)
	@IsInt()
	walkthroughTime: number;

	@ApiProperty({
		description: "Is B-Zone enabled for the stage",
		example: true,
	})
	@Type(() => Boolean)
	@IsBoolean()
	isBZoneEnabled: boolean;

	@ApiProperty({
		description: "Minimum rounds count of the stage",
		example: 10,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly minRounds: number;

	@ApiProperty({
		description: "Maximum scores count of the stage",
		example: 10,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly maxScores: number;

	@ApiProperty({
		description: "Type of the stage",
		example: StageType,
		readOnly: true,
	})
	@IsEnum(StageType)
	readonly stageType: StageType;

	@ApiProperty({
		description: "Date of creation of the stage",
		example: "2022-01-01T00:00:00.000Z",
	})
	@IsDateString()
	createdAt: Date;

	//TODO: relation
	stageOfMatches?: MatchStage[];

	@ApiPropertyOptional({
		description: "Id of the matches the stage is a part of",
		example: [1, 2, 3],
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	stageOfMatchesId?: number[];

	//TODO: relation
	designer: User;

	@ApiProperty({
		description: "Id of the designer of the stage",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	designerId: number;

	//TODO: relation
	scores?: Score[];

	@ApiPropertyOptional({
		description: "Id of the scores the stage has",
		example: [1, 2, 3],
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	scoresId?: number[];
}

export class StageCreateDto extends PickType(StageDto, [
	"name",
	"description",
	"briefing",
	"designer",
	"papers",
	"noShoots",
	"poppers",
	"condidtion",
	"walkthroughTime",
	"isBZoneEnabled",
] as const) {}

export class StageUpdateDto extends PartialType(StageCreateDto) {}

export class StageIdDto extends PickType(StageDto, ["id"] as const) {}
