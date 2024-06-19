import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToOne,
	JoinColumn,
	OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { Shooter } from "./shooter.entity";

@Entity()
export class Team {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@OneToOne(() => User, (user) => user.ownsTeam)
	@JoinColumn()
	owner: User;

	@OneToMany(() => User, (user) => user.adminOfTeam)
	admins: User[];

	@OneToMany(() => Shooter, (shooter) => shooter.team)
	members: Shooter[];

	@CreateDateColumn()
	createdAt: Date;
}
