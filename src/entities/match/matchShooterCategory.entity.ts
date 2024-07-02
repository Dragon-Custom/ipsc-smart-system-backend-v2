import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToMany,
	RelationId,
	RelationCount,
} from "typeorm";
import { MatchShooter } from "./matchShooter.entity";

@Entity()
export abstract class MatchShooterCategory {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@Column()
	abstract name: string;

	@ManyToMany(() => MatchShooter, (matchShooter) => matchShooter.division)
	abstract matchShooters?: MatchShooter[];

	@RelationId((category: MatchShooterCategory) => category.matchShooters)
	abstract readonly matchShooterIds?: number[];

	@RelationCount(
		(matchShooterCategory: MatchShooterCategory) =>
			matchShooterCategory.matchShooters,
	)
	abstract readonly matchShooterCount: number;
}
