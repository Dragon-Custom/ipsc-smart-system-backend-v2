import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToOne,
	JoinColumn,
	ManyToOne,
	OneToMany,
	UpdateDateColumn,
	DeleteDateColumn,
	RelationId,
	BeforeInsert,
	BeforeUpdate,
} from "typeorm";
import { Team } from "./team.entity";
import { Shooter } from "./shooter.entity";
import { Stage } from "./stage.entity";
import { MatchStaff } from "./match";
import { createHash } from "crypto";
import config from "src/config";
@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => Shooter, (shooter) => shooter.belongsUser)
	@JoinColumn()
	shooterProfile: Shooter;

	@RelationId((user: User) => user.shooterProfile)
	@Column({
		nullable: true,
	})
	shooterProfileId?: number;

	@Column()
	nickname: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword() {
		if (!this.password) return;
		// add secret key
		let password =
			this.password + config.security.encrypt.passwordEncryptionKey;
		// sha256 hash
		const firstResult = createHash("sha512")
			.update(password)
			.digest("base64");
		// add secret key
		password = config.security.encrypt.passwordEncryptionKey + firstResult;
		// sha256 hash
		const secondResult = createHash("sha512")
			.update(password)
			.digest("base64");

		this.password = secondResult;
		return this.password;
	}

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;

	@OneToOne(() => Team, (team) => team.owner)
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
