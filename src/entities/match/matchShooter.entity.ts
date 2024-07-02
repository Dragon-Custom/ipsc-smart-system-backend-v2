import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	ManyToMany,
	JoinTable,
	RelationId,
	OneToMany,
} from "typeorm";
import { Match } from "./match.entity";
import { Shooter } from "../shooter.entity";
import { MatchDivision } from "./matchDivision.entity";
import { MatchClassification } from "./matchClassification.entity";
import { MatchShooterCategory } from "./matchShooterCategory.entity";
import { Score } from "./score.entity";

export enum PowerFactor {
	Minor = "Minor",
	Major = "Major",
}

@Entity()
export abstract class MatchShooter {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@Column()
	abstract squad: number;

	@ManyToOne(() => MatchDivision, (division) => division.matchShooters)
	abstract division: MatchDivision;

	@RelationId((matchShooter: MatchShooter) => matchShooter.division)
	abstract readonly divisionId: number;

	@ManyToOne(
		() => MatchClassification,
		(classification) => classification.matchShooters,
	)
	abstract classification: MatchClassification;

	@RelationId((matchShooter: MatchShooter) => matchShooter.classification)
	abstract readonly classificationId: number;

	@Column({
		enum: PowerFactor,
	})
	abstract powerFactor: PowerFactor;

	/**
	 * this is the global DQ flag not the stage DQ flag
	 */
	@Column({
		comment: "This is the global DQ flag not the stage DQ flag",
		default: false,
	})
	abstract isDQed: boolean;

	@ManyToMany(
		() => MatchShooterCategory,
		(category) => category.matchShooters,
	)
	@JoinTable()
	abstract categories?: MatchShooterCategory[];

	@RelationId((matchShooter: MatchShooter) => matchShooter.categories)
	abstract readonly categoryIds?: number[];

	@ManyToOne(() => Match, (match) => match.matchStaffs)
	abstract match: Match;

	@RelationId((matchShooter: MatchShooter) => matchShooter.match)
	abstract readonly matchId: number;

	@ManyToOne(() => Shooter, (shooter) => shooter.shooterOfMatches)
	abstract shooter: Shooter;

	@RelationId((matchShooter: MatchShooter) => matchShooter.shooter)
	abstract readonly shooterId: number;

	@OneToMany(() => Score, (score) => score.matchShooter)
	abstract scores?: Score[];

	@RelationId((matchShooter: MatchShooter) => matchShooter.scores)
	abstract readonly scoresId?: number[];
}
