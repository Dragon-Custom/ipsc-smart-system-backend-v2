import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from "typeorm";
import { MatchStage } from "./matchStage.entity";
import { Shooter } from "../shooter.entity";
import { ScoreProceduralPenalty } from "./scoreProceduralPenalty.entity";

export enum ScoreStateType {
	DidNotAttempted = "Did Not Attempted",
	DNF = "Did Not Finish",
	DQ = "Disqualified",
	Completed = "Completed",
}

@Entity()
export class Score {
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * time in seconds
	 */
	@Column({
		type: "float",
		comment: "Time in seconds",
	})
	time: number;

	@Column({ default: 0 })
	alpha: number;

	@Column({ default: 0 })
	bravo: number;

	@Column({ default: 0 })
	charlie: number;

	@Column({ default: 0 })
	delta: number;

	@Column({ default: 0 })
	miss: number;

	@Column({ default: 0 })
	noShoot: number;

	@Column({ default: 0 })
	popper: number;

	@Column({
		type: "enum",
		enum: ScoreStateType,
		default: ScoreStateType.DidNotAttempted,
	})
	state: ScoreStateType;

	@OneToMany(() => ScoreProceduralPenalty, (penalty) => penalty.score)
	proceduralPenalties: ScoreProceduralPenalty[];

	@Column({ default: 0 })
	totalProceduralPenalties: number;

	@Column({
		type: "int",
		generatedType: "STORED",
		asExpression: `
			(alpha * 5 + bravo * 3 + charlie * 3 + delta * 1 + popper * 5) -
			(miss * 10 + "noShoot" * 10 + "totalProceduralPenalties" * 10)
		`,
	})
	score: number;

	@Column({
		type: "float",
		generatedType: "STORED",
		asExpression: `
			CASE WHEN time = 0 THEN
				0
			ELSE
				(alpha * 5 + bravo * 3 + charlie * 3 + delta * 1 + popper * 5) - (miss * 10 + "noShoot" * 10 + "totalProceduralPenalties" * 10) / time
			END
		`,
	})
	hitFactor: number;

	@ManyToOne(() => MatchStage, (stage) => stage.scores)
	stage: MatchStage;

	@ManyToOne(() => Shooter, (shooter) => shooter.scores)
	shooter: Shooter;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
