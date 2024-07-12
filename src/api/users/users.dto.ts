import {
	ApiProperty,
	ApiPropertyOptional,
	PartialType,
	PickType,
} from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import {
	IsArray,
	IsBoolean,
	IsDateString,
	IsEmail,
	IsInt,
	IsObject,
	IsOptional,
	IsString,
	IsStrongPassword,
	ValidateNested,
} from "class-validator";
import { Match, MatchStaff, Shooter, Stage, Team, User } from "src/entities";
import { ShooterIdDto } from "../shooters/shooters.dto";
import { TeamIdDto } from "../teams/teams.dto";
import { StageIdDto } from "../stages/stages.dto";
import { MatchStaffIdDto } from "../matches/match-staffs/match-staffs.dto";
import config from "src/config";
import { MatchIdDto } from "../matches/matches.dto";

export class UserDto extends User {
	@ApiProperty({
		description: "Id of the user",
		example: 1,
		uniqueItems: true,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	shooterProfile?: Shooter;

	@ApiPropertyOptional({
		description: "Id of the shooter profile",
		example: 1,
		readOnly: true,
	})
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	readonly shooterProfileId?: number;

	@ApiProperty({
		description: "Nickname of the user",
		example: "John Doe",
	})
	@Type(() => String)
	@IsString()
	nickname: string;

	@ApiProperty({
		description: "Email of the user",
		example: "john.doe@example.com",
	})
	@Type(() => String)
	@IsEmail()
	email: string;

	@Exclude()
	encryptedPassword: string;

	@Exclude()
	password: string;

	@ApiProperty({
		description: "Date of creation of the user",
		example: "2022-01-01T00:00:00.000Z",
	})
	@IsDateString()
	createdAt: Date;

	ownsTeam?: Team;

	@ApiPropertyOptional({
		description: "Id of the team the user owns",
		example: 1,
		readOnly: true,
	})
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	readonly ownsTeamId?: number;

	adminOfTeam?: Team;

	@ApiPropertyOptional({
		description: "Id of the team the user is an admin of",
		example: 1,
		readOnly: true,
	})
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	readonly adminOfTeamId?: number;

	designedStages?: Stage[];

	@ApiPropertyOptional({
		description: "Id of the stages the user designed",
		example: [1, 2, 3],
		readOnly: true,
		type: [Number],
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly designedStagesIds?: number[];

	staffOfMatches?: MatchStaff[];

	@ApiPropertyOptional({
		description: "Id of the matches the user is a staff of",
		example: [1, 2, 3],
		readOnly: true,
		type: [Number],
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly staffOfMatchesIds?: number[];

	@ApiProperty({
		description: "Is the user active",
		example: true,
	})
	@Type(() => Boolean)
	@IsBoolean()
	isActive: boolean;

	@ApiProperty({
		description: "Is the user banned",
		example: false,
	})
	@Type(() => Boolean)
	@IsBoolean()
	isBanned: boolean;

	organizedMatches?: Match[];

	@ApiPropertyOptional({
		description: "Id of the matches the user organized",
		example: [1, 2, 3],
		readOnly: true,
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	readonly organizedMatchesIds?: number[];
}

export class CreateUserDto extends PickType(UserDto, [
	"nickname",
	"email",
] as const) {
	@ApiProperty({
		description: "Password of the user",
		example: "password123",
	})
	@IsStrongPassword(config.security.passwordOption)
	password: string;

	@ApiPropertyOptional({
		description: "User's shooter profile",
		type: () => ShooterIdDto,
	})
	@IsOptional()
	@IsObject()
	@ValidateNested()
	@Type(() => ShooterIdDto)
	shooterProfile?: Shooter;

	@ApiPropertyOptional({
		description: "User's team",
		type: () => TeamIdDto,
	})
	@IsOptional()
	@IsObject()
	@ValidateNested()
	@Type(() => TeamIdDto)
	ownsTeam?: Team;

	@ApiPropertyOptional({
		description: "User's admin team",
		type: () => TeamIdDto,
	})
	@IsOptional()
	@IsObject()
	@ValidateNested()
	@Type(() => TeamIdDto)
	adminOfTeam?: Team;

	@ApiPropertyOptional({
		description: "User's designed stages",
		type: () => [StageIdDto],
	})
	@IsOptional()
	@IsObject()
	@IsArray()
	@ValidateNested()
	@Type(() => StageIdDto)
	designedStages?: Stage[];

	@ApiPropertyOptional({
		description: "User's staff of matches",
		type: () => [MatchStaffIdDto],
	})
	@IsOptional()
	@IsObject()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => MatchStaffIdDto)
	staffOfMatches?: MatchStaff[];

	@ApiPropertyOptional({
		description: "User's organized matches",
		type: () => [MatchIdDto],
	})
	@IsOptional()
	@IsArray()
	@IsObject({ each: true })
	@ValidateNested({ each: true })
	@Type(() => MatchIdDto)
	organizedMatches?: Match[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserIdDto extends PickType(UserDto, ["id"] as const) {}
