import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	AfterUpdate,
	ManyToOne,
} from "typeorm";
import { Team } from "./team.entity";

@Entity()
export class Shooter {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	fullName: string;
	@AfterUpdate()
	setFullName() {
		this.fullName = this.firstName + " " + this.lastName;
	}

	@ManyToOne(() => Team, (team) => team.members)
	team: Team;

	@CreateDateColumn()
	createdAt: Date;
}
