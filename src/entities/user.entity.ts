import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToOne,
	JoinColumn,
	ManyToOne,
	OneToMany,
} from "typeorm";
import { Team } from "./team.entity";
import { Shooter } from "./shooter.entity";
import { Stage } from "./stage.entity";

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

	@OneToMany(() => Stage, (stage) => stage.designer)
	designedStages: Stage[];

	@Column({ default: false })
	isActive: boolean;

	@Column({ default: false })
	isBanned: boolean;
}
