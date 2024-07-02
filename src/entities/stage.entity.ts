import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
	OneToMany,
	RelationId,
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
export abstract class Stage {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@Column()
	abstract name: string;

	@Column({ nullable: true })
	abstract description?: string;

	@Column({ nullable: true })
	abstract briefing?: string;

	@ManyToOne(() => User, (user) => user.designedStages)
	abstract designer: User;

	@RelationId((stage: Stage) => stage.designer)
	abstract readonly designerId: number;

	@Column()
	abstract papers: number;

	@Column()
	abstract noShoots: number;

	@Column()
	abstract poppers: number;

	@Column()
	abstract condidtion: number;

	/**
	 * in seconds
	 */
	@Column({ comment: "in seconds", type: "time" })
	abstract walkthroughTime: number;

	@Column()
	abstract isBZoneEnabled: boolean;

	@Column({
		generatedType: "STORED",
		asExpression: `(papers * 2 + poppers)`,
	})
	abstract readonly minRounds: number;

	@Column({
		generatedType: "STORED",
		asExpression: `(papers * 2 * 5 + poppers * 5)`,
	})
	abstract readonly maxScores: number;

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
	abstract readonly stageType: StageType;

	@OneToMany(() => MatchStage, (matchStage) => matchStage.stage)
	abstract stageOfMatches?: MatchStage[];

	@RelationId((stage: Stage) => stage.stageOfMatches)
	abstract readonly stageOfMatchesId?: number[];

	@CreateDateColumn()
	abstract createdAt: Date;
}
