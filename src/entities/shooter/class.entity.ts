import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToMany,
} from "typeorm";
import { Shooter } from "./shooter.entity";

@Entity()
export class Class {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false, unique: true })
	name: string;

	@OneToMany(() => Shooter, (shooter) => shooter.class)
	shooters: Shooter[];

	@CreateDateColumn({ nullable: false })
	createAt: Date;
}
