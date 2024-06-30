import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Stage } from "./stage.entity";

@Entity("image")
export abstract class Image {
	@PrimaryGeneratedColumn("uuid")
	abstract id: string;

	@Column()
	abstract name: string;

	@Column({
		unique: true,
	})
	abstract path: string;

	@Column()
	abstract height: number;

	@Column()
	abstract width: number;

	@Column()
	abstract fileType: string;

	/**
	 * Size of the image in bytes
	 */
	@Column()
	abstract size: number;

	@CreateDateColumn()
	abstract createdAt: Date;

	@ManyToOne(() => Stage, (stage) => stage.attachments)
	stage: Stage;
}
