import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsInt } from "class-validator";
import { Match, MatchStaff, StaffRole, User } from "src/entities";

export class MatchStaffsDto extends MatchStaff {
	// id: number;
	// role: StuffRole;
	// match: Match;
	// matchId: number;
	// user: User;
	// userId: number;

	@ApiProperty({
		description: "Match staff id",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@ApiProperty({
		description: "Match staff role",
		example: StaffRole.CRO,
	})
	@IsEnum(MatchStaff)
	role: StaffRole;

	//TODO: relation
	match: Match;

	@ApiProperty({
		description: "Match id",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly matchId: number;

	//TODO: relation
	user: User;

	@ApiProperty({
		description: "User id",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly userId: number;
}

export class CreateMatchStaffsDto extends PickType(MatchStaffsDto, [
	"role",
	"match",
	"user",
] as const) {}

export class UpdateMatchStaffsDto extends PartialType(MatchStaffsDto) {}

export class MatchStaffIdDto extends PickType(MatchStaffsDto, [
	"id",
] as const) {}
