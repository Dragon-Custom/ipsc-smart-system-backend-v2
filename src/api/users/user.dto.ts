import { PickType } from "@nestjs/mapped-types";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import {
	IsArray,
	IsBoolean,
	IsDate,
	IsEmail,
	IsInt,
	IsObject,
	IsOptional,
	IsString,
	IsStrongPassword,
	ValidateNested,
} from "class-validator";
import config from "src/config";
import { MatchStaff, Shooter, Stage, Team, User } from "src/entities";
import { ShooterIdDto } from "../shooters/shooter.dto";
import { TeamIdDto } from "../teams/teams.dto";
import { StageIdDto } from "../stages/stages.dto";

export class UserDto extends User {
	@Exclude()
	password: string;

	@Exclude()
	deletedAt: Date;

	@ApiProperty({
		example: 1,
		description: "Id of the user",
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@ApiPropertyOptional({
		description: "Shooter profile of the user",
		type: Shooter,
	})
	@IsOptional()
	@Type(() => ShooterIdDto)
	@ValidateNested()
	@IsObject()
	shooterProfile?: Shooter;

	@ApiPropertyOptional({
		example: 1,
		description: "Shooter profile id of the user",
	})
	@Type(() => Number)
	@IsOptional()
	@IsInt()
	shooterProfileId?: number;

	@ApiProperty({
		example: "John Doe",
		description: "Nickname of the user",
	})
	@IsString()
	nickname: string;

	@ApiProperty({
		example: "john.doe@example.com",
		description: "Email of the user",
	})
	@IsEmail()
	email: string;

	@ApiProperty({
		example: new Date(),
		description: "Date of creation of the user",
	})
	@IsDate()
	createdAt: Date;

	@ApiProperty({
		example: new Date(),
		description: "Date of last update of the user",
	})
	@IsDate()
	updatedAt: Date;

	@ApiPropertyOptional({
		description: "Team that the user owns",
		type: Team,
	})
	@IsOptional()
	@Type(() => TeamIdDto)
	@ValidateNested()
	@IsObject()
	ownsTeam?: Team;

	@ApiPropertyOptional({
		example: 1,
		description: "Id of the team that the user owns",
	})
	@Type(() => Number)
	@IsOptional()
	@IsInt()
	ownerOfTeamId?: number;

	@ApiPropertyOptional({
		description: "Team that the user is an admin of",
		type: Team,
	})
	@IsOptional()
	@Type(() => TeamIdDto)
	@ValidateNested()
	@IsObject()
	adminOfTeam?: Team;

	@ApiPropertyOptional({
		example: 1,
		description: "Id of the team that the user is an admin of",
	})
	@Type(() => Number)
	@IsOptional()
	@IsInt()
	adminOfTeamId?: number;

	@ApiPropertyOptional({
		description: "Stages that the user designed",
		type: Stage,
	})
	@IsOptional()
	@IsArray()
	@Type(() => StageIdDto)
	@ValidateNested({ each: true })
	@IsObject({ each: true })
	designedStages?: Stage[];

	@ApiPropertyOptional({
		example: [1, 2, 3],
		description: "Ids of the stages that the user designed",
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	designedStagesIds?: number[];

	@Exclude()
	stuffOfMatches?: MatchStaff[];

	@ApiPropertyOptional({
		example: [1, 2, 3],
		description: "Ids of the matches that the user is a staff of",
	})
	@IsOptional()
	@IsArray()
	@Type(() => Number)
	@IsInt({ each: true })
	stuffOfMatchesIds?: number[];

	@ApiProperty({
		example: true,
		description: "Is the user active",
	})
	@IsBoolean()
	isActive: boolean;

	@ApiProperty({
		example: false,
		description: "Is the user banned",
	})
	@IsBoolean()
	isBanned: boolean;
}

export class CreateUserDto extends PickType(UserDto, [
	"email",
	"nickname",
	"shooterProfileId",
] as const) {
	// @ApiProperty({
	// 	example: "johndoe123",
	// 	description: "Password of the user",
	// })
	// @IsStrongPassword(config.security.passwordOptions)
	// password: string;
	// @ApiProperty({
	// 	example: "John Doe",
	// 	description: "Nickname of the user",
	// })
	// @IsString()
	// nickname: string;
	// @ApiProperty({
	// 	example: "john.doe@example.com",
	// 	description: "Email of the user",
	// })
	// @IsEmail()
	// email: string;
	// @ApiPropertyOptional({
	// 	example: 1,
	// 	description: "Shooter profile id of the user",
	// })
	// @IsOptional()
	// @Type(() => Number)
	// @IsInt()
	// shooterProfileId?: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserIdDto extends PickType(UserDto, ["id"] as const) {}
