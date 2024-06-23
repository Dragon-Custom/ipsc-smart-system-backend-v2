import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToOne,
	JoinColumn,
	ManyToOne,
	OneToMany,
	RelationId,
} from "typeorm";
import { Team } from "./team.entity";
import { Shooter } from "./shooter.entity";
import { Stage } from "./stage.entity";
import { MatchStaff } from "./match";
import { Exclude, Expose } from "class-transformer";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	@Expose()
	id: number;

	@RelationId((user: User) => user.shooterProfile)
	@Expose()
	shooterProfileId: number;

	@OneToOne(() => Shooter, (shooter) => shooter.belongsUser)
	@JoinColumn()
	@Exclude()
	shooterProfile: Shooter;

	@Column()
	@Expose()
	nickname: string;

	@Column()
	@Expose()
	email: string;

	@Column()
	@Exclude()
	encryptedPassword: string;

	@CreateDateColumn()
	@Expose()
	createdAt: Date;

	@OneToOne(() => Team, (team) => team.owner)
	@Exclude()
	ownsTeam: Team;

	@ManyToOne(() => Team, (team) => team.admins)
	@Exclude()
	adminOfTeam: Team;

	@OneToMany(() => Stage, (stage) => stage.designer)
	@Exclude()
	designedStages: Stage[];

	@OneToMany(() => MatchStaff, (match) => match.user)
	@Exclude()
	stuffOfMatches: MatchStaff[];

	@Column({ default: false })
	@Exclude()
	isActive: boolean;

	@Column({ default: false })
	@Exclude()
	isBanned: boolean;
}
