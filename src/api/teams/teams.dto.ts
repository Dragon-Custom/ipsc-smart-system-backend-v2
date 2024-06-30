import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";
import { Team } from "src/entities";

export class TeamDto extends Team {}

export class CreateTeamDto extends PickType(TeamDto, [
	"name",
	"description",
	"ownerId",
] as const) {
	@ApiProperty({
		description: "Team's name",
		example: "Team 1",
		required: true,
		type: String,
	})
	@IsString()
	name: string;

	@ApiProperty({
		description: "Team's description",
		example: "This is the first team",
		required: false,
		type: String,
	})
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty({
		description: "Team's owner's id",
		example: 1,
		required: true,
		type: Number,
	})
	@Type(() => Number)
	@IsInt()
	ownerId: number;
}

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}
