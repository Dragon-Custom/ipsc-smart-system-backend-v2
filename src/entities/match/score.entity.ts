import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	VirtualColumn,
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

	@Column()
	alpha: number;

	@Column()
	bravo: number;

	@Column()
	charlie: number;

	@Column()
	delta: number;

	@Column()
	miss: number;

	@Column()
	noShoot: number;

	@Column()
	popper: number;

	@Column({
		type: "enum",
		enum: ScoreStateType,
	})
	state: ScoreStateType;

	@OneToMany(() => ScoreProceduralPenalty, (penalty) => penalty.score)
	proceduralPenalties: ScoreProceduralPenalty[];

	@VirtualColumn({
		query: (alias) =>
			`SELECT SUM("count") FROM "score_procedural_penalty" WHERE "scoreId" = ${alias}.id`,
	})
	totalProceduralPenalties: number;

	@ManyToOne(() => MatchStage, (stage) => stage.scores)
	stage: MatchStage;

	@ManyToOne(() => Shooter, (shooter) => shooter.scores)
	shooter: Shooter;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
