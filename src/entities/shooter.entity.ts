import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
	OneToOne,
	OneToMany,
	RelationId,
} from "typeorm";
import { Team } from "./team.entity";
import { User } from "./user.entity";
import { MatchShooter, Score } from "./match";

@Entity()
export abstract class Shooter {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@OneToOne(() => User, (user) => user.shooterProfile)
	abstract belongsUser?: User;

	@RelationId((shooter: Shooter) => shooter.belongsUser)
	abstract readonly belongsUserId?: number;

	@Column()
	abstract firstName: string;

	@Column()
	abstract lastName: string;

	@Column({
		generatedType: "STORED",
		asExpression: `"firstName" || ' ' || "lastName"`,
	})
	abstract readonly fullName: string;

	@ManyToOne(() => Team, (team) => team.members, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	abstract team?: Team;

	@RelationId((shooter: Shooter) => shooter.team)
	abstract readonly teamId?: number;

	@OneToMany(() => MatchShooter, (matchShooter) => matchShooter.shooter)
	abstract shooterOfMatches?: MatchShooter[];

	@RelationId((shooter: Shooter) => shooter.shooterOfMatches)
	abstract readonly shooterOfMatchesIds?: number[];

	@OneToMany(() => Score, (score) => score.matchShooter)
	abstract scores?: Score[];

	@RelationId((shooter: Shooter) => shooter.scores)
	abstract readonly scoresIds?: number[];

	@CreateDateColumn()
	abstract createdAt: Date;
}
