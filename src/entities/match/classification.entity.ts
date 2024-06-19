import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { MatchShooter } from "./matchShooter.entity";

@Entity()
export class Classification {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@OneToMany(
		() => MatchShooter,
		(matchShooter) => matchShooter.classification,
	)
	matchShooters: MatchShooter[];
}
