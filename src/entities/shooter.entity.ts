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

	@Column()
	name: string;

	@Column()
	division: Division;

	@Column({ nullable: true })
	email?: string;

	@CreateDateColumn({})
	createAt: Date;
}
