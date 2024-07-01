import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToMany,
	RelationId,
} from "typeorm";
import { MatchShooter } from "./matchShooter.entity";

@Entity()
export abstract class MatchShooterCategory {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@Column()
	abstract name: string;

	@ManyToMany(() => MatchShooter, (matchShooter) => matchShooter.categories)
	matchShooters: MatchShooter[];

	@RelationId(
		(matchShooter: MatchShooterCategory) => matchShooter.matchShooters,
	)
	abstract matchShootersIds: number[];
}
