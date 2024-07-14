import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToMany,
	RelationId,
	RelationCount,
	ManyToOne,
	DeleteDateColumn,
} from "typeorm";
import { MatchStaff } from "./matchStaff.entity";
import { MatchShooter } from "./matchShooter.entity";
import { MatchStage } from "./matchStage.entity";
import { MatchDivision } from "./matchDivision.entity";
import { MatchClassification } from "./matchClassification.entity";
import { User } from "../user.entity";
import { Score } from "./score.entity";
import { ScoreProceduralPenalty } from "./scoreProceduralPenalty.entity";
import { MatchShooterCategory } from "./matchShooterCategory.entity";

@Entity()
export abstract class Match {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@Column()
	abstract name: string;

	@Column({ nullable: true })
	abstract description?: string;

	@OneToMany(() => MatchStaff, (matchStuff) => matchStuff.match)
	abstract matchStaffs?: MatchStaff[];

	@RelationCount((match: Match) => match.matchStaffs)
	abstract readonly matchStaffCount: number;

	@RelationId((match: Match) => match.matchStaffs)
	abstract readonly matchStaffIds?: number[];

	@OneToMany(() => MatchStaff, (matchStuff) => matchStuff.match)
	abstract matchShooters?: MatchShooter[];

	@RelationCount((match: Match) => match.matchShooters)
	abstract readonly matchShooterCount: number;

	@RelationId((match: Match) => match.matchShooters)
	abstract readonly matchShooterIds?: number[];

	@OneToMany(() => MatchStage, (matchStage) => matchStage.match)
	abstract matchStages?: MatchStage[];

	@RelationCount((match: Match) => match.matchStages)
	abstract readonly matchStageCount: number;

	@RelationId((match: Match) => match.matchStages)
	abstract readonly matchStageIds?: number[];

	@OneToMany(() => MatchDivision, (matchDivision) => matchDivision.match)
	abstract matchDivisions?: MatchDivision[];

	@RelationId((match: Match) => match.matchDivisions)
	abstract readonly matchDivisionIds?: number[];

	@OneToMany(
		() => MatchClassification,
		(classification) => classification.match,
	)
	abstract matchClassifications?: MatchClassification[];

	@RelationId((match: Match) => match.matchClassifications)
	abstract readonly matchClassificationIds?: number[];

	@ManyToOne(() => User, (user) => user.organizedMatches)
	abstract readonly organizer: User;

	@RelationId((match: Match) => match.organizer)
	abstract readonly organizerId: number;

	@OneToMany(() => Score, (score) => score.match)
	abstract scores?: Score[];

	@RelationCount((match: Match) => match.scores)
	abstract readonly scoreCount: number;

	@RelationId((match: Match) => match.scores)
	abstract readonly scoreIds?: number[];

	@OneToMany(
		() => MatchShooterCategory,
		(matchShooterCategory) => matchShooterCategory.match,
	)
	matchShooterCategories: MatchShooterCategory[];

	@RelationCount((match: Match) => match.matchShooterCategories)
	readonly matchShooterCategoryCount: number;

	@OneToMany(
		() => ScoreProceduralPenalty,
		(scoreProceduralPenalty) => scoreProceduralPenalty.match,
	)
	scoreProceduralPenalties: ScoreProceduralPenalty[];

	@RelationCount((match: Match) => match.scoreProceduralPenalties)
	readonly scoreProceduralPenaltyCount: number;

	@RelationId((match: Match) => match.scoreProceduralPenalties)
	readonly scoreProceduralPenaltyIds?: number[];

	@Column()
	abstract level: number;

	@Column({ nullable: true })
	abstract link?: string;

	@Column()
	abstract matchDate: Date;

	/**
	 * Whether the stage DQ is enabled for this match.
	 * When is stage dq, shooter will only DQ at that stage.
	 * If false, shooter are DQ over entire match.
	 */
	@Column()
	abstract isStageDQEnabled: boolean;

	@CreateDateColumn()
	abstract createdAt: Date;

	@Column({ default: false })
	abstract isFinished: boolean;

	@DeleteDateColumn()
	deletedAt?: Date;
}
