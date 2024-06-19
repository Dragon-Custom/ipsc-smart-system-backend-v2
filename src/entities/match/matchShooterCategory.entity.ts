import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { MatchShooter } from "./matchShooter.entity";

@Entity()
export class MatchShooterCategory {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToMany(() => MatchShooter, (matchShooter) => matchShooter.division)
	matchShooters: MatchShooter[];
}
