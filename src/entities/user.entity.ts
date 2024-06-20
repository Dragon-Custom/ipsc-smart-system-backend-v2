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
import { MatchStaff } from "./match";
import { Exclude } from "class-transformer";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => Shooter, (shooter) => shooter.belongsUser)
	@JoinColumn()
	shooterProfile: Shooter;

	@Column()
	nickname: string;

	@Column({ unique: true })
	email: string;

	@Exclude()
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

	@OneToMany(() => MatchStaff, (match) => match.user)
	stuffOfMatches: MatchStaff[];

	@Column({ default: false })
	isActive: boolean;

	@Column({ default: false })
	isBanned: boolean;
}
