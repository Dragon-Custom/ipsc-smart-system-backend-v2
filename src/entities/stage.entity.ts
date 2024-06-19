import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
	OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { MatchStage } from "./match/matchStage.entity";

export enum StageType {
	Short = "Short",
	Medium = "Medium",
	Long = "Long",
	Unclassified = "Unclassified",
}

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

	@Column({
		generatedType: "STORED",
		asExpression: `(papers * 2 + poppers)`,
	})
	minRounds: number;

	@Column({
		generatedType: "STORED",
		asExpression: `(papers * 2 * 5 + poppers * 5)`,
	})
	maxScores: number;

	@Column({
		type: "enum",
		enum: StageType,
		generatedType: "STORED",
		asExpression: `
			CASE WHEN (papers * 2 + poppers) <= 12 THEN
				stage_stagetype_enum('${StageType.Short}')
			WHEN (papers * 2 + poppers) <= 24 THEN
				stage_stagetype_enum('${StageType.Medium}')
			WHEN (papers * 2 + poppers) <= 32 THEN
				stage_stagetype_enum('${StageType.Long}')
			ELSE
				stage_stagetype_enum('${StageType.Unclassified}')
			END
		`,
	})
	stageType: StageType;

	@OneToMany(() => MatchStage, (matchStage) => matchStage.stage)
	stageOfMatches: MatchStage[];

	@CreateDateColumn()
	createdAt: Date;
}
