import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToOne,
	JoinColumn,
	OneToMany,
	RelationId,
	UpdateDateColumn,
	DeleteDateColumn,
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
	description?: string;

	@OneToOne(() => User, (user) => user.ownsTeam)
	@JoinColumn()
	owner: User;

	@RelationId((team: Team) => team.owner)
	@Column({
		nullable: false,
	})
	ownerId: number;

	@OneToMany(() => User, (user) => user.adminOfTeam)
	admins: User[];

	@OneToMany(() => Shooter, (shooter) => shooter.team)
	members: Shooter[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
