import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToMany,
} from "typeorm";
import { Shooter } from "./shooter.entity";

@Entity()
export class Division {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	name: string;

	@CreateDateColumn({ nullable: false })
	createAt: Date;

	@OneToMany(() => Shooter, (shooter) => shooter.division)
	shooters: Shooter[];
}
