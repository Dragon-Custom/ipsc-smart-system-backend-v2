import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
	OneToOne,
	OneToMany,
	RelationId,
	UpdateDateColumn,
	DeleteDateColumn,
	JoinColumn,
} from "typeorm";
import { Team } from "./team.entity";
import { User } from "./user.entity";
import { MatchShooter, Score } from "./match";

@Entity()
export class Shooter {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => User, (user) => user.shooterProfile)
	belongsUser: User;

	@RelationId((shooter: Shooter) => shooter.belongsUser)
	belongsUserId?: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({
		generatedType: "STORED",
		asExpression: `"firstName" || ' ' || "lastName"`,
	})
	fullName: string;

	@ManyToOne(() => Team, (team) => team.members)
	@JoinColumn()
	team: Team;

	@RelationId((shooter: Shooter) => shooter.team)
	@Column({
		nullable: true,
	})
	teamId?: number;

	@OneToMany(() => MatchShooter, (matchShooter) => matchShooter.shooter)
	shooterOfMatches: MatchShooter[];

	@OneToMany(() => Score, (score) => score.shooter)
	scores: Score[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
