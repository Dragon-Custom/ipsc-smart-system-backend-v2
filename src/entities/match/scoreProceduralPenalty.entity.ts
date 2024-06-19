import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Score } from "./score.entity";
import { ProceduralPenalty } from "./proceduralPenalty.entity";

@Entity()
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
