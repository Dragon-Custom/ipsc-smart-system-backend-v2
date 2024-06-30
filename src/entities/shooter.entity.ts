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
export abstract class Shooter {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@OneToOne(() => User, (user) => user.shooterProfile)
	belongsUser: User;

	@RelationId((shooter: Shooter) => shooter.belongsUser)
	abstract belongsUserId?: number;

	@Column()
	abstract firstName: string;

	@Column()
	abstract lastName: string;

	@Column({
		generatedType: "STORED",
		asExpression: `"firstName" || ' ' || "lastName"`,
	})
	abstract readonly fullName: string;

	@ManyToOne(() => Team, (team) => team.members)
	@JoinColumn()
	team: Team;

	@RelationId((shooter: Shooter) => shooter.team)
	@Column({
		nullable: true,
	})
	abstract teamId?: number;

	@OneToMany(() => MatchShooter, (matchShooter) => matchShooter.shooter)
	shooterOfMatches: MatchShooter[];

	@OneToMany(() => Score, (score) => score.shooter)
	scores: Score[];

	@CreateDateColumn()
	abstract readonly createdAt: Date;

	@UpdateDateColumn()
	abstract readonly updatedAt: Date;

	@DeleteDateColumn()
	abstract readonly deletedAt: Date;
}
