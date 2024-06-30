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
	@Column({
		nullable: false,
	})
	abstract ownerId: number;

	@OneToMany(() => User, (user) => user.adminOfTeam)
	abstract admins: User[];

	@OneToMany(() => Shooter, (shooter) => shooter.team)
	abstract members: Shooter[];

	/**
	 * ISO 3166-1 alpha-3 code for the team's region
	 */
	@Column({
		comment: "ISO 3166-1 alpha-3 code for the team's region",
		type: "varchar",
		length: 3,
		default: "XXX",
	})
	abstract region: string;

	@CreateDateColumn()
	abstract createdAt: Date;

	@UpdateDateColumn()
	abstract updatedAt: Date;
}
