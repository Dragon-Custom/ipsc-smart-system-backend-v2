import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToOne,
	JoinColumn,
	OneToMany,
	RelationId,
	RelationCount,
} from "typeorm";
import { User } from "./user.entity";
import { Shooter } from "./shooter.entity";

@Entity()
export abstract class Team {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@Column()
	abstract name: string;

	@Column({ nullable: true })
	abstract description?: string;

	@OneToOne(() => User, (user) => user.ownsTeam)
	@JoinColumn()
	abstract owner: User;

	@RelationId((team: Team) => team.owner)
	@Column()
	abstract readonly ownerId: number;

	@OneToMany(() => User, (user) => user.adminOfTeam)
	abstract admins?: User[];

	@RelationId((team: Team) => team.admins)
	abstract readonly adminIds?: number[];

	@OneToMany(() => Shooter, (shooter) => shooter.team)
	abstract members?: Shooter[];

	@RelationId((team: Team) => team.members)
	abstract readonly memberIds?: number[];

	@RelationCount((team: Team) => team.members)
	abstract readonly membersCount: number;

	@CreateDateColumn()
	abstract createdAt: Date;
}
