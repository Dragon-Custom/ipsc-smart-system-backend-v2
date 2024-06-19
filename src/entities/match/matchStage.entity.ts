import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
import { Match } from "./match.entity";
import { Stage } from "../stage.entity";
import { Score } from "./score.entity";

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

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
