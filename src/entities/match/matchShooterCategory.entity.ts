import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToMany,
	RelationId,
	RelationCount,
	ManyToOne,
} from "typeorm";
import { MatchShooter } from "./matchShooter.entity";
import { Match } from "./match.entity";

@Entity()
export abstract class MatchShooterCategory {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@Column()
	abstract name: string;

	@ManyToMany(() => MatchShooter, (matchShooter) => matchShooter.division)
	abstract matchShooters?: MatchShooter[];

	@RelationId((category: MatchShooterCategory) => category.matchShooters)
	abstract readonly matchShooterIds?: number[];

	@RelationCount(
		(matchShooterCategory: MatchShooterCategory) =>
			matchShooterCategory.matchShooters,
	)
	abstract readonly matchShooterCount: number;

	@ManyToOne(() => Match, (match) => match.matchShooterCategories)
	match: Match;

	@RelationId((category: MatchShooterCategory) => category.match)
	matchId: number;
}
