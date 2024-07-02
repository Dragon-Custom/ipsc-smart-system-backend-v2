import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	RelationId,
	ManyToOne,
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

	@ManyToOne(() => Match, (match) => match.matchDivisions)
	abstract match: Match;

	@RelationId((division: MatchDivision) => division.match)
	abstract readonly matchId: number;
}
