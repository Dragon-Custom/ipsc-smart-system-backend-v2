import { Division } from "src/types";
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
} from "typeorm";

@Entity()
export class Shooter {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	name: string;

	@Column({ nullable: false })
	division: Division;

	@Column({ nullable: true })
	email: string;

	@CreateDateColumn({ nullable: false })
	createAt: Date;
}
