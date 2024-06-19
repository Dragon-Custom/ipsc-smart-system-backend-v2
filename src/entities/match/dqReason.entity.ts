import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Score } from "./score.entity";
import { StageDQShooter } from "./stageDqShooter.entity";

@Entity()
export class DQReason {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	content: string;

	@Column()
	index: string;

	@OneToMany(() => Score, (score) => score.dqReason)
	dqedScores: Score[];

	@OneToMany(() => StageDQShooter, (score) => score.dqReason)
	stageDqs: StageDQShooter[];
}
