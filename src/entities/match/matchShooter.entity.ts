import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	ManyToMany,
	JoinTable,
	OneToMany,
} from "typeorm";
import { Match } from "./match.entity";
import { Shooter } from "../shooter.entity";
import { Division } from "./division.entity";
import { Classification } from "./classification.entity";
import { MatchShooterCategory } from "./matchShooterCategory.entity";
import { StageDQShooter } from "./stageDqShooter.entity";

@Entity()
export class MatchShooter {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	squad: number;

	@ManyToOne(() => Division, (division) => division.matchShooters)
	division: Division;

	@ManyToOne(
		() => Classification,
		(classification) => classification.matchShooters,
	)
	classification: Classification;

	/**
	 * this is the global DQ flag not the stage DQ flag
	 */
	@Column({
		comment: "This is the global DQ flag not the stage DQ flag",
	})
	isDQed: boolean;

	@ManyToMany(
		() => MatchShooterCategory,
		(category) => category.matchShooters,
	)
	@JoinTable()
	categories: MatchShooterCategory[];

	@OneToMany(() => StageDQShooter, (dqedShooter) => dqedShooter.shoooter)
	stageDQ: StageDQShooter;

	@ManyToOne(() => Match, (match) => match.staffs)
	match: Match;

	@ManyToOne(() => Shooter, (shooter) => shooter.shooterOfMatches)
	shooter: Shooter;
}
