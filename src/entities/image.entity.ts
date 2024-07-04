import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Stage } from "./stage.entity";

@Entity()
export abstract class Image {
	@PrimaryGeneratedColumn("uuid")
	abstract id: string;

	@Column()
	abstract fileName: string;

	@Column()
	abstract path: string;

	@Column()
	abstract height: number;

	@Column()
	abstract width: number;

	@Column()
	abstract size: number;

	@Column()
	abstract fileType: string;

	@CreateDateColumn()
	abstract readonly createdAt: Date;

	@ManyToOne(() => Stage, (stage) => stage.attachments, {
		onDelete: "CASCADE",
	})
	stageAttachments: Stage;
}
