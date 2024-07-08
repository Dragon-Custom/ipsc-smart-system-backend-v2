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
export abstract class MatchClassification {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@Column()
	abstract name: string;

	@OneToMany(
		() => MatchShooter,
		(matchShooter) => matchShooter.classification,
	)
	abstract matchShooters?: MatchShooter[];

	@RelationId(
		(classification: MatchClassification) => classification.matchShooters,
	)
	abstract readonly matchShooterIds?: number[];

	@RelationCount(
		(classification: MatchClassification) => classification.matchShooters,
	)
	abstract readonly matchShooterCount: number;

	@ManyToOne(() => Match, (match) => match.matchClassifications, {
		nullable: false,
		onDelete: "CASCADE",
	})
	abstract match: Match;

	@RelationId((classification: MatchClassification) => classification.match)
	@Column({ nullable: false })
	abstract readonly matchId: number;
}
