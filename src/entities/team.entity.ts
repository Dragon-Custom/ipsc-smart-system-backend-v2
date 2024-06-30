import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToOne,
	JoinColumn,
	OneToMany,
	RelationId,
	VirtualColumn,
	AfterLoad,
	AfterInsert,
	AfterUpdate,
} from "typeorm";
import { User } from "./user.entity";
import { Shooter } from "./shooter.entity";
import { Exclude, Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsInt, IsOptional, IsString } from "class-validator";

@Entity()
export class Team {
	@PrimaryGeneratedColumn()
	@Expose()
	@ApiProperty()
	@Type(() => Number)
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
	@IsOptional()
	@IsString()
	description?: string;

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
	adminsIds: number[];

	@OneToMany(() => Shooter, (shooter) => shooter.team, {
		eager: false,
	})
	@Exclude()
	members: Shooter[];

	@RelationId((team: Team) => team.members)
	@Expose()
	@ApiProperty()
	@IsArray()
	membersIds: number[];

	@Expose()
	@ApiProperty()
	@Type(() => Number)
	@IsInt()
	@VirtualColumn({
		query: (alias) =>
			`SELECT COUNT("id") FROM public."shooter" WHERE "teamId" = ${alias}.id`,
		type: "int",
		hstoreType: "object",
	})
	membersCount: number;

	@AfterLoad()
	@AfterInsert()
	@AfterUpdate()
	private generateMembersCount(): void {
		if (this.membersIds) this.membersCount = this.membersIds.length;
		else this.membersCount = 0;
	}

	@CreateDateColumn()
	@Expose()
	@ApiProperty()
	@IsDate()
	createdAt: Date;
}
