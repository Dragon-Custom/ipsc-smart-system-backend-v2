import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ScoreProceduralPenalty } from "./scoreProceduralPenalty.entity";

@Entity()
export class ProceduralPenalty {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	content: string;

	@Column()
	index: string;

	@OneToMany(
		() => ScoreProceduralPenalty,
		(proceduralPenalty) => proceduralPenalty.proceduralPenalty,
	)
	proceduralPenaltyOfScores: ScoreProceduralPenalty[];
}
