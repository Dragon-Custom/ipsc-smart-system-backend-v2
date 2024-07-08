import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	RelationId,
	ManyToOne,
	RelationCount,
} from "typeorm";
import { MatchShooter } from "./matchShooter.entity";
import { Match } from "./match.entity";

@Entity()
export abstract class MatchDivision {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@Column()
	abstract name: string;

	@OneToMany(() => MatchShooter, (matchShooter) => matchShooter.division)
	abstract matchShooters?: MatchShooter[];

	@RelationId((division: MatchDivision) => division.matchShooters)
	abstract readonly matchShooterIds?: number[];

	@RelationCount((division: MatchDivision) => division.matchShooters)
	abstract readonly matchShooterCount: number;

	@ManyToOne(() => Match, (match) => match.matchDivisions, {
		nullable: false,
		onDelete: "CASCADE",
	})
	abstract match: Match;

	@RelationId((division: MatchDivision) => division.match)
	@Column({ nullable: false })
	abstract readonly matchId: number;
}
