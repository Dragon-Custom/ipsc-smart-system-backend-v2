import {
	ApiProperty,
	ApiPropertyOptional,
	PartialType,
	PickType,
} from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
	IsArray,
	IsDateString,
	IsInt,
	IsObject,
	IsOptional,
	IsString,
	ValidateNested,
} from "class-validator";
import { Shooter, Team, User } from "src/entities";
import { UserIdDto } from "../users/users.dto";
import { ShooterIdDto } from "../shooters/shooters.dto";

export class TeamDto extends Team {
	@ApiProperty({
		description: "Id of the team",
		example: 1,
		uniqueItems: true,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@ApiProperty({
		description: "Name of the team",
		example: "Team 1",
	})
	@Type(() => String)
	@IsString()
	name: string;

	@ApiPropertyOptional({
		description: "Description of the team",
		example: "This is the first team",
	})
	@Type(() => String)
	@IsString()
	@IsOptional()
	description?: string;

	@ApiProperty({
		description: "Member count of the team",
		example: 10,
	})
	@Type(() => Number)
	@IsInt()
	membersCount: number;

	@ApiProperty({
		description: "Date of creation of the team",
		example: "2022-01-01T00:00:00.000Z",
	})
	@IsDateString()
	createdAt: Date;

	owner: User;

	@ApiProperty({
		description: "Id of the owner of the team",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly ownerId: number;

	admins?: User[];

	@ApiPropertyOptional({
		description: "Id of the admins of the team",
		example: [1, 2, 3],
		readOnly: true,
		type: [Number],
	})
	@Type(() => Number)
	@IsInt({ each: true })
	@IsOptional()
	readonly adminIds?: number[];

	members?: Shooter[];

	@ApiPropertyOptional({
		description: "Id of the members of the team",
		example: [1, 2, 3],
		readOnly: true,
		type: [Number],
	})
	@Type(() => Number)
	@IsInt({ each: true })
	@IsOptional()
	readonly memberIds?: number[];
}

export class CreateTeamDto extends PickType(TeamDto, [
	"name",
	"description",
] as const) {
	@ApiProperty({
		description: "Owner of the team",
		type: () => UserIdDto,
	})
	@ValidateNested()
	@IsObject()
	@Type(() => UserIdDto)
	owner: User;

	@ApiPropertyOptional({
		description: "Admins of the team",
		type: () => [UserIdDto],
	})
	@IsOptional()
	@IsObject({ each: true })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => UserIdDto)
	admins?: User[];

	@ApiPropertyOptional({
		description: "Members of the team",
		type: () => [ShooterIdDto],
	})
	@IsOptional()
	@IsObject({ each: true })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ShooterIdDto)
	members?: () => Shooter[];
}

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}

export class TeamIdDto extends PickType(TeamDto, ["id"] as const) {}
