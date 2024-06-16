import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToMany,
} from "typeorm";
import { Shooter } from "./shooter.entity";

@Entity()
export class ShooterCategory {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	name: string;

	@CreateDateColumn({ nullable: false })
	createAt: Date;

	@ManyToMany(() => Shooter, (shooter) => shooter.categories)
	shooters: Shooter[];
}
