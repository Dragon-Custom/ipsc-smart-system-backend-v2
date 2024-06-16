import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
} from "typeorm";
import { Shooter } from "./shooter.entity";

@Entity()
export class Class {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	name: string;

	@ManyToOne(() => Shooter, (shooter) => shooter.class)
	shooters: Shooter[];

	@CreateDateColumn({ nullable: false })
	createAt: Date;
}
