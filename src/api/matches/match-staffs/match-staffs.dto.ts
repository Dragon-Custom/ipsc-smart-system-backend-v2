import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsObject, ValidateNested } from "class-validator";
import { Match, MatchStaff, StaffRole, User } from "src/entities";
import { MatchIdDto } from "../matches.dto";
import { UserIdDto } from "src/api/users/users.dto";

export class MatchStaffsDto extends MatchStaff {
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
		enum: StaffRole,
	})
	@IsEnum(StaffRole)
	role: StaffRole;

	match: Match;

	@ApiProperty({
		description: "Match id",
		example: 1,
		readOnly: true,
	})
	@Type(() => Number)
	@IsInt()
	readonly matchId: number;

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
] as const) {
	@ApiProperty({
		description: "Match id entity",
		type: () => MatchIdDto,
	})
	@ValidateNested()
	@IsObject()
	@Type(() => MatchIdDto)
	match: Match;

	@ApiProperty({
		description: "User id entity",
		type: () => UserIdDto,
	})
	@ValidateNested()
	@IsObject()
	@Type(() => UserIdDto)
	user: User;
}

export class UpdateMatchStaffsDto extends PartialType(MatchStaffsDto) {}

export class MatchStaffIdDto extends PickType(MatchStaffsDto, [
	"id",
] as const) {}
