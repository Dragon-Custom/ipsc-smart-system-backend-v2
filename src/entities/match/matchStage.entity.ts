import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Match } from "./match.entity";
import { Stage } from "../stage.entity";

@Entity()
export class MatchStage {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Match, (match) => match.staffs)
	match: Match;

	@ManyToOne(() => Stage, (stage) => stage.stageOfMatches)
	stage: Stage;
}
