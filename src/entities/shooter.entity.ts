import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	AfterUpdate,
	ManyToOne,
	OneToOne,
	JoinColumn,
} from "typeorm";
import { Team } from "./team.entity";
import { User } from "./user.entity";

@Entity()
export class Shooter {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => User, (user) => user.shooterProfile)
	@JoinColumn()
	belongsUser: User;

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
