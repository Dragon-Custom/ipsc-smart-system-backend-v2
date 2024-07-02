import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToOne,
	JoinColumn,
	ManyToOne,
	OneToMany,
	BeforeInsert,
	BeforeUpdate,
	RelationId,
} from "typeorm";
import { Team } from "./team.entity";
import { Shooter } from "./shooter.entity";
import { Stage } from "./stage.entity";
import { MatchStaff } from "./match";
import config from "src/config";
import { createHash } from "crypto";

@Entity()
export abstract class User {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@OneToOne(() => Shooter, (shooter) => shooter.belongsUser, {
		nullable: true,
	})
	@JoinColumn()
	abstract shooterProfile?: Shooter;

	@RelationId((user: User) => user.shooterProfile)
	abstract readonly shooterProfileId?: number;

	@Column()
	abstract nickname: string;

	@Column()
	abstract email: string;

	@Column()
	abstract encryptedPassword: string;

	abstract password: string;

	@BeforeInsert()
	@BeforeUpdate()
	private async hashPassword() {
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
	abstract createdAt: Date;

	@OneToOne(() => Team, (team) => team.owner, {
		nullable: true,
	})
	abstract ownsTeam?: Team;

	@RelationId((user: User) => user.ownsTeam)
	abstract readonly ownsTeamId?: number;

	@ManyToOne(() => Team, (team) => team.admins)
	abstract adminOfTeam?: Team;

	@RelationId((user: User) => user.adminOfTeam)
	abstract readonly adminOfTeamId?: number;

	@OneToMany(() => Stage, (stage) => stage.designer)
	abstract designedStages?: Stage[];

	@RelationId((user: User) => user.designedStages)
	abstract readonly designedStagesId?: number[];

	@OneToMany(() => MatchStaff, (match) => match.user)
	abstract stuffOfMatches?: MatchStaff[];

	@RelationId((user: User) => user.stuffOfMatches)
	abstract readonly stuffOfMatchesId?: number[];

	@Column({ default: false })
	abstract isActive: boolean;

	@Column({ default: false })
	abstract isBanned: boolean;
}
