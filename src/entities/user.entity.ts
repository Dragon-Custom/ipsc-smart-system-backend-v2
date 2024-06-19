import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToOne,
	JoinColumn,
	ManyToOne,
} from "typeorm";
import { Team } from "./team.entity";
import { Shooter } from "./shooter.entity";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => Shooter, (shooter) => shooter.belongsUser)
	@JoinColumn()
	shooterProfile: Shooter;

	@Column()
	nickname: string;

	@Column()
	email: string;

	@Column()
	encryptedPassword: string;

	@CreateDateColumn()
	createdAt: Date;

	@OneToOne(() => Team, (team) => team.owner)
	@JoinColumn()
	ownsTeam: Team;

	@ManyToOne(() => Team, (team) => team.admins)
	adminOfTeam: Team;

	@Column({ default: false })
	isActive: boolean;

	@Column({ default: false })
	isBanned: boolean;
}
