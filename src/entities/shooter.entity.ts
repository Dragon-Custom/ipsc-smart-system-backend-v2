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
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Shooter {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number;

	@OneToOne(() => User, (user) => user.shooterProfile)
	@JoinColumn()
	@Field(() => User)
	belongsUser: User;

	@Column()
	@Field(() => String)
	firstName: string;

	@Column()
	@Field(() => String)
	lastName: string;

	@Column({
		generatedType: "STORED",
		asExpression: `"firstName" || ' ' || "lastName"`,
	})
	@Field(() => String)
	fullName: string;

	@ManyToOne(() => Team, (team) => team.members)
	team: Team;

	@OneToMany(() => MatchShooter, (matchShooter) => matchShooter.shooter)
	shooterOfMatches: MatchShooter[];

	@OneToMany(() => Score, (score) => score.shooter)
	scores: Score[];

	@CreateDateColumn()
	@Field(() => Date)
	createdAt: Date;
}
