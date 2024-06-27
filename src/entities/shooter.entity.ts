import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
	OneToOne,
	OneToMany,
	RelationId,
	VirtualColumn,
	DeleteDateColumn,
} from "typeorm";
import { Team } from "./team.entity";
import { User } from "./user.entity";
import { MatchShooter, Score } from "./match";
import { Exclude, Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsOptional, IsString } from "class-validator";

@Entity()
export class Shooter {
	@PrimaryGeneratedColumn()
	@Expose()
	@ApiProperty()
	@Type(() => Number)
	@IsInt()
	id: number;

	@VirtualColumn({
		query: (alias) =>
			`SELECT id FROM public."user" WHERE "shooterProfileId" = ${alias}.id`,
	})
	@RelationId((shooter: Shooter) => shooter.belongsUser)
	@Expose()
	@ApiProperty()
	@Type(() => Number)
	@IsOptional()
	@IsInt()
	belongsUserId?: number | null = null;

	@OneToOne(() => User, (user) => user.shooterProfile, {
		eager: false,
	})
	@Exclude()
	belongsUser: User;

	@Column()
	@Expose()
	@ApiProperty()
	@IsString()
	firstName: string;

	@Column()
	@Expose()
	@ApiProperty()
	@IsString()
	lastName: string;

	@Column({
		generatedType: "STORED",
		asExpression: `"firstName" || ' ' || "lastName"`,
	})
	@Expose()
	@ApiProperty()
	@IsString()
	fullName: string;

	@RelationId((shooter: Shooter) => shooter.team)
	@Expose()
	@ApiProperty({
		description: "set it to 0 to unbound the shooter from a team",
	})
	@Type(() => Number)
	@IsOptional()
	@IsInt()
	teamId?: number | null = null;

	@ManyToOne(() => Team, (team) => team.members, { nullable: true })
	@Exclude()
	team?: Team;

	@OneToMany(() => MatchShooter, (matchShooter) => matchShooter.shooter)
	@Exclude()
	shooterOfMatches: MatchShooter[];

	@OneToMany(() => Score, (score) => score.shooter)
	@Exclude()
	scores: Score[];

	@CreateDateColumn()
	@Expose()
	@ApiProperty()
	@IsDate()
	createdAt: Date;

	@DeleteDateColumn()
	@Exclude()
	deletedAt?: Date;
}
