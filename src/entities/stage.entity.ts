import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
	AfterUpdate,
	OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { MatchStage } from "./match/matchStage.entity";

export type StageType = "Short" | "Medium" | "Long" | "Unclassified";

@Entity()
export class Stage {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@Column({ nullable: true })
	briefing: string;

	@ManyToOne(() => User, (user) => user.designedStages)
	designer: User;

	@Column()
	papers: number;

	@Column()
	noShoots: number;

	@Column()
	poppers: number;

	@Column()
	condidtion: number;

	/**
	 * in seconds
	 */
	@Column({ comment: "in seconds", type: "time" })
	walkthroughTime: number;

	@Column()
	isBZoneEnabled: boolean;

	minRounds: number;
	maxScores: number;
	stageType: StageType;

	@AfterUpdate()
	setCalculatedFields() {
		this.minRounds = this.papers * 2 + this.poppers;
		this.maxScores = this.papers * 2 * 5 + this.poppers * 5;
		if (this.minRounds <= 12) this.stageType = "Short";
		else if (this.minRounds <= 24) this.stageType = "Medium";
		else if (this.minRounds <= 32) this.stageType = "Long";
		else this.stageType = "Unclassified";
	}

	@OneToMany(() => MatchStage, (matchStage) => matchStage.stage)
	stageOfMatches: MatchStage[];

	@CreateDateColumn()
	createdAt: Date;
}
