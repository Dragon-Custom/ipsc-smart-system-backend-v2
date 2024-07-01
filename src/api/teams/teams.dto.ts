import {
	ApiProperty,
	ApiPropertyOptional,
	PartialType,
	PickType,
} from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import {
	IsDate,
	IsISO31661Alpha3,
	IsInt,
	IsOptional,
	IsString,
} from "class-validator";
import { Shooter, Team, User } from "src/entities";

export class TeamDto extends Team {
	@ApiProperty({
		description: "Team's id",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@ApiProperty({
		description: "Team's name",
		example: "Team 1",
	})
	@IsString()
	name: string;

	@ApiPropertyOptional({
		description: "Team's description",
		example: "This is the first team",
	})
	@IsOptional()
	@IsString()
	description?: string;

	@Exclude()
	owner: User;

	@ApiProperty({
		description: "Team's owner's id",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	ownerId: number;

	@Exclude()
	admins: User[];

	@Exclude()
	members: Shooter[];

	@ApiProperty({
		description: "Team's creation date",
		example: new Date(),
	})
	@IsDate()
	createdAt: Date;

	@ApiProperty({
		description: "Team's region",
		example: "HKG",
		default: "XXX",
	})
	@IsISO31661Alpha3()
	region: string;

	@ApiProperty({
		description: "Team's last update date",
		example: new Date(),
	})
	@IsDate()
	updatedAt: Date;
}

export class CreateTeamDto extends PickType(TeamDto, [
	"name",
	"description",
	"ownerId",
] as const) {}

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}

export class TeamIdDto extends PickType(TeamDto, ["id"] as const) {}
