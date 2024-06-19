import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { MatchShooter } from "./matchShooter.entity";

@Entity()
export class Division {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@OneToMany(() => MatchShooter, (matchShooter) => matchShooter.division)
	matchShooters: MatchShooter[];
}
