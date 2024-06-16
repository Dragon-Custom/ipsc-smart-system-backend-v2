import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
} from "typeorm";
import { Division } from "./division.entity";
import { Team } from "./team.entity";
import { Class } from "./class.entity";

@Entity()
export class Shooter {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	name: string;

	@ManyToOne(() => Division, (division) => division.shooters)
	division: Division;

	@ManyToOne(() => Team, (team) => team.shooters)
	team: Team;

	@ManyToOne(() => Class, (_class) => _class.shooters)
	class: Class;

	@Column({ nullable: true })
	email: string;

	@CreateDateColumn({ nullable: false })
	createAt: Date;
}
