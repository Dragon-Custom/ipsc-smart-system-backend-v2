import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToMany,
} from "typeorm";
import { MatchStaff } from "./matchStaff.entity";
import { MatchShooter } from "./matchShooter.entity";

@Entity()
export class Match {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@OneToMany(() => MatchStaff, (matchStuff) => matchStuff.match)
	staffs: MatchStaff[];

	@OneToMany(() => MatchStaff, (matchStuff) => matchStuff.match)
	shooters: MatchShooter[];

	@Column()
	level: number;

	@Column({ nullable: true })
	link?: string;

	@Column()
	matchDate: Date;

	@CreateDateColumn()
	createdAt: Date;
}
