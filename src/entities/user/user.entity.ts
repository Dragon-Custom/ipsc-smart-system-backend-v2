import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToOne,
	JoinColumn,
	Column,
} from "typeorm";
import { Shooter, Team } from "../shooter";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => Shooter)
	@JoinColumn()
	shooter: Shooter;

	@Column()
	encryptedPassword: string;

	@Column({ default: false })
	isAdmin: boolean;

	@CreateDateColumn({ nullable: false })
	createAt: Date;

	@OneToOne(() => Team, { nullable: true })
	ownsTeam: Team;
}
