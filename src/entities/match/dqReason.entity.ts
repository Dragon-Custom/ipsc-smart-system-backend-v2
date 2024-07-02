import {
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	RelationId,
} from "typeorm";
import { Score } from "./score.entity";

@Entity()
export abstract class DQReason {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@Column()
	abstract name: string;

	@Column()
	abstract content: string;

	@Column()
	abstract index: string;

	@OneToMany(() => Score, (score) => score.dqReason)
	abstract dqedScores: Score[];

	@RelationId((dqReason: DQReason) => dqReason.dqedScores)
	abstract readonly dqedScoresIds: number[];
}
