import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToMany,
	RelationId,
} from "typeorm";
import { MatchStaff } from "./matchStaff.entity";
import { MatchShooter } from "./matchShooter.entity";
import { MatchStage } from "./matchStage.entity";

@Entity()
export abstract class Match {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@Column()
	abstract name: string;

	@Column({ nullable: true })
	abstract description?: string;

	@OneToMany(() => MatchStaff, (matchStuff) => matchStuff.match)
	staffs: MatchStaff[];

	@RelationId((match: Match) => match.staffs)
	abstract staffIds: number[];

	@OneToMany(() => MatchStaff, (matchStuff) => matchStuff.match)
	matchShooters: MatchShooter[];

	@RelationId((match: Match) => match.matchShooters)
	abstract matchShooterIds: number[];

	@OneToMany(() => MatchStage, (matchStage) => matchStage.match)
	matchStage: MatchStage[];

	@RelationId((match: Match) => match.matchStage)
	abstract matchStageIds: number[];

	@Column()
	abstract level: number;

	@Column({ nullable: true })
	abstract link?: string;

	@Column()
	abstract matchDate: Date;

	/**
	 * Whether the stage DQ is enabled for this match.
	 * When is stage dq, shooter will only DQ at that stage.
	 * If false, shooter are DQ over entire match.
	 */
	@Column()
	abstract isStageDQEnabled: boolean;

	@CreateDateColumn()
	abstract createdAt: Date;

	@Column({ default: false })
	abstract isFinished: boolean;
}
