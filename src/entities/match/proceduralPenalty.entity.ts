import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	RelationId,
} from "typeorm";
import { ScoreProceduralPenalty } from "./scoreProceduralPenalty.entity";

@Entity()
export abstract class ProceduralPenalty {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@Column()
	abstract name: string;

	@Column()
	abstract content: string;

	@Column()
	abstract index: string;

	@OneToMany(
		() => ScoreProceduralPenalty,
		(proceduralPenalty) => proceduralPenalty.proceduralPenalty,
	)
	abstract proceduralPenaltyOfScores?: ScoreProceduralPenalty[];

	@RelationId(
		(proceduralPenalty: ProceduralPenalty) =>
			proceduralPenalty.proceduralPenaltyOfScores,
	)
	abstract readonly scoreProceduralPenaltyIds?: number[];
}
