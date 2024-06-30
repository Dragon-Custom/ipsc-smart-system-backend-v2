import {
	ApiProperty,
	ApiPropertyOptional,
	PartialType,
	PickType,
} from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString } from "class-validator";
import { MatchShooter, Score, Shooter, Team, User } from "src/entities";

export class ShooterDto extends Shooter {
	@ApiProperty({
		description: "The ID of the shooter",
		example: 1,
	})
	@Type(() => Number)
	@IsInt()
	id: number;

	@Exclude()
	belongsUser: User;

	@ApiPropertyOptional({
		description: "The ID of the user who owns the shooter",
		example: 1,
	})
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	belongsUserId?: number;

	@ApiProperty({
		description: "The shooter's first name",
		example: "John",
	})
	@IsString()
	firstName: string;

	@ApiProperty({
		description: "The shooter's last name",
		example: "Doe",
	})
	@IsString()
	lastName: string;

	@ApiProperty({
		description: "The shooter's full name",
		example: "John Doe",
		readOnly: true,
	})
	@IsString()
	fullName: string;

	@Exclude()
	team: Team;

	@ApiPropertyOptional({
		description: "The ID of the team the shooter belongs to",
		example: 1,
	})
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	teamId?: number;

	@Exclude()
	shooterOfMatches: MatchShooter[];

	@Exclude()
	scores: Score[];

	@ApiProperty({
		description: "The date the shooter was created",
		example: new Date(),
		readOnly: true,
	})
	@IsDate()
	createdAt: Date;

	@ApiProperty({
		description: "The date the shooter was last updated",
		example: new Date(),
		readOnly: true,
	})
	@IsDate()
	updatedAt: Date;

	@Exclude()
	deletedAt: Date;
}

export class CreateShooterDto extends PickType(ShooterDto, [
	"firstName",
	"lastName",
	"belongsUserId",
	"teamId",
] as const) {}

export class UpdateShooterDto extends PartialType(ShooterDto) {}
