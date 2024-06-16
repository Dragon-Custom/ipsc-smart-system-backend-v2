import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
	ManyToMany,
	JoinTable,
	VirtualColumn,
} from "typeorm";
import { Division } from "./division.entity";
import { Team } from "./team.entity";
import { Class } from "./class.entity";
import { ShooterCategory } from "./category.entity";

@Entity()
export class Shooter {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	name: string;

	@ManyToOne(() => Division, (division) => division.shooters)
	division: Division;
	@VirtualColumn({
		query: () => `SELECT division.name AS divisionName`,
	})
	divisionName: string;

	@ManyToOne(() => Team, (team) => team.shooters)
	team: Team;
	@VirtualColumn({
		query: () => `SELECT team.name AS teamName`,
	})
	teamName: string;

	@ManyToOne(() => Class, (_class) => _class.shooters)
	class: Class;

	@VirtualColumn({
		query: () => `SELECT class.name AS className`,
	})
	className: string;

	@ManyToMany(() => ShooterCategory, (category) => category.shooters)
	@JoinTable()
	categories: ShooterCategory[];

	@Column({ nullable: true })
	email: string;

	@CreateDateColumn({ nullable: false })
	createAt: Date;
}
