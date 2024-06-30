import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
	OneToMany,
	DeleteDateColumn,
	UpdateDateColumn,
	OneToOne,
	RelationId,
	JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { MatchStage } from "./match/matchStage.entity";
import { Image } from "./image.entity";

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

	@OneToOne(() => Image)
	@JoinColumn()
	thumbnail: Image;

	@RelationId((stage: Stage) => stage.thumbnail)
	@Column()
	abstract thumbnailId: string;

	@OneToMany(() => Image, (image) => image.stage)
	attachments: Image[];

	@RelationId((stage: Stage) => stage.attachments)
	abstract attachmentIds?: string[];

	@Column({ nullable: true })
	abstract description?: string;

	@Column({ nullable: true })
	abstract briefing?: string;

	@ManyToOne(() => User, (user) => user.designedStages, { nullable: false })
	@JoinColumn()
	designer: User;

	@RelationId((stage: Stage) => stage.designer)
	@Column()
	abstract designerId: number;

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
	@Column({ comment: "in seconds" })
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
	stageOfMatches: MatchStage[];

	@CreateDateColumn()
	abstract readonly createdAt: Date;

	@UpdateDateColumn()
	abstract readonly updatedAt: Date;

	@DeleteDateColumn()
	abstract readonly deletedAt: Date;
}
