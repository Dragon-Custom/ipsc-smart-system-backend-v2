import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	DeleteDateColumn,
	RelationId,
} from "typeorm";
import { MatchStage } from "./matchStage.entity";
import { ScoreProceduralPenalty } from "./scoreProceduralPenalty.entity";
import { DQReason } from "./dqReason.entity";
import { MatchShooter, PowerFactor } from "./matchShooter.entity";

export enum ScoreStateType {
	DidNotAttempted = "Did Not Attempted",
	DNF = "Did Not Finish",
	DQ = "Disqualified",
	Completed = "Completed",
}

@Entity()
export abstract class Score {
	@PrimaryGeneratedColumn()
	abstract id: number;

	/**
	 * time in seconds
	 */
	@Column({
		type: "float",
		comment: "Time in seconds",
	})
	abstract time: number;

	@Column({ default: 0 })
	abstract alpha: number;

	@Column({ default: 0 })
	abstract bravo: number;

	@Column({ default: 0 })
	abstract charlie: number;

	@Column({ default: 0 })
	abstract delta: number;

	@Column({ default: 0 })
	abstract miss: number;

	@Column({ default: 0 })
	abstract noShoot: number;

	@Column({ default: 0 })
	abstract popper: number;

	@Column({
		type: "enum",
		enum: ScoreStateType,
		default: ScoreStateType.DidNotAttempted,
	})
	abstract state: ScoreStateType;

	@OneToMany(() => ScoreProceduralPenalty, (penalty) => penalty.score)
	abstract scoreProceduralPenalties?: ScoreProceduralPenalty[];

	@RelationId((score: Score) => score.scoreProceduralPenalties)
	abstract readonly scoreProceduralPenaltiesId?: number[];

	@Column({ default: 0 })
	abstract totalProceduralPenalties: number;

	@Column({
		type: "int",
		generatedType: "STORED",
		asExpression: `
			CASE WHEN "powerFactor" = 'Minor' THEN
				(alpha * 5 + bravo * 3 + charlie * 3 + delta * 1 + popper * 5) - (miss * 10 + "noShoot" * 10 + "totalProceduralPenalties" * 10) 
			ELSE
				(alpha * 5 + bravo * 4 + charlie * 4 + delta * 2 + popper * 5) - (miss * 10 + "noShoot" * 10 + "totalProceduralPenalties" * 10) 
			END
		`,
	})
	abstract readonly score: number;

	@Column({
		type: "float",
		generatedType: "STORED",
		asExpression: `
			CASE WHEN time = 0 THEN
				0
			ELSE
				CASE WHEN "powerFactor" = 'Minor' THEN
					(alpha * 5 + bravo * 3 + charlie * 3 + delta * 1 + popper * 5) - (miss * 10 + "noShoot" * 10 + "totalProceduralPenalties" * 10) / time
				ELSE
					(alpha * 5 + bravo * 4 + charlie * 4 + delta * 2 + popper * 5) - (miss * 10 + "noShoot" * 10 + "totalProceduralPenalties" * 10) / time
				END
			END
		`,
	})
	abstract readonly hitFactor: number;

	@Column({
		enum: PowerFactor,
	})
	powerFactor: PowerFactor;

	@ManyToOne(() => MatchStage, (stage) => stage.scores)
	abstract matchStage: MatchStage;

	@RelationId((score: Score) => score.matchStage)
	abstract readonly matchStageId: number;

	@ManyToOne(() => MatchShooter, (shooter) => shooter.scores)
	abstract matchShooter: MatchShooter;

	@RelationId((score: Score) => score.matchShooter)
	abstract readonly matchShooterId: number;

	@ManyToOne(() => DQReason, (reason) => reason.dqedScores)
	abstract dqReason?: DQReason;

	@RelationId((score: Score) => score.dqReason)
	abstract readonly dqReasonId?: number;

	@CreateDateColumn()
	abstract readonly createdAt: Date;

	@UpdateDateColumn()
	abstract readonly updatedAt: Date;

	@DeleteDateColumn()
	abstract readonly deletedAt: Date;

	/**
	 * The change of the score
	 */
	@Column({
		default: 1,
	})
	abstract iterations: number;
}
