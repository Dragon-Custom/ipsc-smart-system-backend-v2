import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	Column,
	Check,
} from "typeorm";
import { Score } from "./score.entity";
import { ProceduralPenalty } from "./proceduralPenalty.entity";

@Entity()
@Check("count >= 1")
export class ScoreProceduralPenalty {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	count: number;

	@ManyToOne(() => Score, (score) => score.proceduralPenalties)
	score: Score;

	@ManyToOne(() => Score, (score) => score.proceduralPenalties)
	proceduralPenalty: ProceduralPenalty;
}
