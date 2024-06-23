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
	BeforeInsert,
	BeforeUpdate,
} from "typeorm";
import { Team } from "./team.entity";
import { Shooter } from "./shooter.entity";
import { Stage } from "./stage.entity";
import { MatchStaff } from "./match";
import { Exclude, Expose } from "class-transformer";
import config from "src/config";
import { createHash } from "crypto";

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

	@Column({ default: "" })
	@Exclude()
	passwordSalt: string;

	encryptePassword(password: string, salt: string) {
		// add secret key
		password = password + config.security.password.passwordEncryptionSecret;
		// sha256 hash
		const firstResult = createHash("sha512")
			.update(password)
			.digest("base64");
		// add secret key
		password = salt + firstResult;
		console.log(password, salt);
		// sha256 hash
		const secondResult = createHash("sha512")
			.update(password)
			.digest("base64");

		return secondResult;
	}

	@Exclude()
	password: string;

	@BeforeInsert()
	@BeforeUpdate()
	async encryptPassword() {
		this.passwordSalt = createHash("sha512")
			.update(Math.random().toString())
			.digest("base64");
		this.encryptedPassword = this.encryptePassword(
			this.password,
			this.passwordSalt,
		);
	}
}
