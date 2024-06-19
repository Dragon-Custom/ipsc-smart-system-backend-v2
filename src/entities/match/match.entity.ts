import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToMany,
} from "typeorm";
import { MatchStaff } from "./matchStaff.entity";
import { MatchShooter } from "./matchShooter.entity";
import { MatchStage } from "./matchStage.entity";

@Entity()
export class Match {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@OneToMany(() => MatchStaff, (matchStuff) => matchStuff.match)
	staffs: MatchStaff[];

	@OneToMany(() => MatchStaff, (matchStuff) => matchStuff.match)
	shooters: MatchShooter[];

	@OneToMany(() => MatchStage, (matchStage) => matchStage.match)
	stages: MatchStage[];

	@Column()
	level: number;

	@Column({ nullable: true })
	link?: string;

	@Column()
	matchDate: Date;

	/**
	 * Whether the stage DQ is enabled for this match.
	 * When is stage dq, shooter will only DQ at that stage.
	 * If false, shooter are DQ over entire match.
	 */
	@Column()
	isStageDQEnabled: boolean;

	@CreateDateColumn()
	createdAt: Date;
}
