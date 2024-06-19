import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
} from "typeorm";
import { Match } from "./match.entity";
import { Stage } from "../stage.entity";
import { Score } from "./score.entity";
import { StageDQShooter } from "./stageDqShooter.entity";

@Entity()
export class MatchStage {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(() => Score, (stage) => stage.stage)
	scores: Score[];

	@ManyToOne(() => Match, (match) => match.staffs)
	match: Match;

	@ManyToOne(() => Stage, (stage) => stage.stageOfMatches)
	stage: Stage;

	@OneToMany(() => StageDQShooter, (matchShooter) => matchShooter.shoooter)
	stageDQ: StageDQShooter[];

	@Column({ default: false })
	isFinished: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
