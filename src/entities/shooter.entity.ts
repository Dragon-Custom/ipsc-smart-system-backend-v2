import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
	OneToOne,
	JoinColumn,
	OneToMany,
} from "typeorm";
import { Team } from "./team.entity";
import { User } from "./user.entity";
import { MatchShooter, Score } from "./match";

@Entity()
export class Shooter {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => User, (user) => user.shooterProfile)
	@JoinColumn()
	belongsUser: User;

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
	team: Team;

	@OneToMany(() => MatchShooter, (matchShooter) => matchShooter.shooter)
	shooterOfMatches: MatchShooter[];

	@OneToMany(() => Score, (score) => score.shooter)
	scores: Score[];

	@CreateDateColumn()
	createdAt: Date;
}
