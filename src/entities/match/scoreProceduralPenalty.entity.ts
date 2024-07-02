import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	Column,
	Check,
	RelationId,
} from "typeorm";
import { Score } from "./score.entity";
import { ProceduralPenalty } from "./proceduralPenalty.entity";

@Entity()
@Check("count >= 1")
export abstract class ScoreProceduralPenalty {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@Column()
	abstract count: number;

	@ManyToOne(() => Score, (score) => score.scoreProceduralPenalties, {
		nullable: false,
	})
	abstract score: Score;

	@RelationId(
		(scoreProceduralPenalty: ScoreProceduralPenalty) =>
			scoreProceduralPenalty.score,
	)
	abstract readonly scoreId: number;

	@ManyToOne(() => Score, (score) => score.scoreProceduralPenalties, {
		nullable: false,
	})
	abstract proceduralPenalty: ProceduralPenalty;

	@RelationId(
		(scoreProceduralPenalty: ScoreProceduralPenalty) =>
			scoreProceduralPenalty.proceduralPenalty,
	)
	abstract readonly proceduralPenaltyId: number;
}
