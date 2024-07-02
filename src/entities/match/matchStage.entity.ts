import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	RelationId,
} from "typeorm";
import { Match } from "./match.entity";
import { Stage } from "../stage.entity";
import { Score } from "./score.entity";

@Entity()
export abstract class MatchStage {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@OneToMany(() => Score, (stage) => stage.matchStage)
	abstract scores?: Score[];

	@RelationId((matchStage: MatchStage) => matchStage.scores)
	abstract readonly scoreIds?: number[];

	@ManyToOne(() => Match, (match) => match.matchStaffs)
	abstract match: Match;

	@RelationId((matchStage: MatchStage) => matchStage.match)
	abstract readonly matchId: number;

	@ManyToOne(() => Stage, (stage) => stage.stageOfMatches)
	abstract stage: Stage;

	@RelationId((matchStage: MatchStage) => matchStage.stage)
	abstract readonly stageId: number;

	@Column({ default: false })
	abstract isFinished: boolean;

	@CreateDateColumn()
	abstract createdAt: Date;

	@UpdateDateColumn()
	abstract updatedAt: Date;
}
