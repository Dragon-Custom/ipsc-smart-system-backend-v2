import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { MatchStage } from "./matchStage.entity";
import { MatchShooter } from "./matchShooter.entity";
import { DQReason } from "./dqReason.entity";

@Entity()
export class StageDQShooter {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => DQReason, (reason) => reason.stageDqs)
	dqReason: DQReason;

	@ManyToOne(() => MatchStage, (stage) => stage.stageDQ)
	stage: MatchStage;

	@ManyToOne(() => MatchShooter, (shooter) => shooter.stageDQ)
	shoooter: MatchShooter;
}
