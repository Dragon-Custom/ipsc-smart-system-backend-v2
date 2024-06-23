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
import { Exclude, Expose } from "class-transformer";

@Entity()
export class Shooter {
	@PrimaryGeneratedColumn()
	@Expose()
	id: number;

	@VirtualColumn({
		query: (alias) =>
			`SELECT id FROM public."user" WHERE "shooterProfileId" = ${alias}.id`,
	})
	@RelationId((shooter: Shooter) => shooter.belongsUser)
	@Expose()
	belongsUserId?: number | null = null;

	@OneToOne(() => User, (user) => user.shooterProfile, {
		eager: false,
	})
	@Exclude()
	belongsUser: User;

	@Column()
	@Expose()
	firstName: string;

	@Column()
	@Expose()
	lastName: string;

	@Column({
		generatedType: "STORED",
		asExpression: `"firstName" || ' ' || "lastName"`,
	})
	@Expose()
	fullName: string;

	@RelationId((shooter: Shooter) => shooter.team)
	@Expose()
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
	createdAt: Date;

	@DeleteDateColumn()
	@Exclude()
	deletedAt?: Date;
}
