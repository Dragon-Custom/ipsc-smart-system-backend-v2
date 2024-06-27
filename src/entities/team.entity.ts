import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToOne,
	JoinColumn,
	OneToMany,
	RelationId,
} from "typeorm";
import { User } from "./user.entity";
import { Shooter } from "./shooter.entity";
import { Exclude, Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsInt, IsString } from "class-validator";

@Entity()
export class Team {
	@PrimaryGeneratedColumn()
	@Expose()
	@ApiProperty()
	@IsInt()
	id: number;

	@Column()
	@Expose()
	@ApiProperty()
	@IsString()
	name: string;

	@Column({ nullable: true })
	@Expose()
	@ApiProperty()
	@IsString()
	description: string;

	@OneToOne(() => User, (user) => user.ownsTeam)
	@JoinColumn()
	@Exclude()
	owner: User;

	@RelationId((team: Team) => team.owner)
	@Expose()
	@ApiProperty()
	@Type(() => Number)
	@IsInt()
	ownerId: number;

	@OneToMany(() => User, (user) => user.adminOfTeam)
	@Exclude()
	admins: User[];

	@RelationId((team: Team) => team.admins)
	@Expose()
	@ApiProperty()
	@IsArray()
	adminsId: number[];

	@OneToMany(() => Shooter, (shooter) => shooter.team)
	@Exclude()
	members: Shooter[];

	@RelationId((team: Team) => team.members)
	@Expose()
	@ApiProperty()
	@IsArray()
	membersId: number[];

	@CreateDateColumn()
	@Expose()
	@ApiProperty()
	@IsDate()
	createdAt: Date;
}
