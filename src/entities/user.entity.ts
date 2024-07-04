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
	@Column({ nullable: true })
	abstract readonly shooterProfileId?: number;

	@Column()
	abstract nickname: string;

	@Column({ unique: true })
	abstract email: string;

	@Column()
	abstract encryptedPassword: string;

	abstract password: string;

	static async hashPassword(password: string) {
		if (!password) return;
		// add secret key
		password = password + config.security.encrypt.passwordEncryptionKey;
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
		return secondResult;
	}

	@BeforeInsert()
	@BeforeUpdate()
	private async hashPassword() {
		this.encryptedPassword = await User.hashPassword(this.password);
		delete this.password;
	}

	@CreateDateColumn()
	abstract createdAt: Date;

	@OneToOne(() => Team, (team) => team.owner, {
		nullable: true,
	})
	abstract ownsTeam?: Team;

	@RelationId((user: User) => user.ownsTeam)
	abstract readonly ownsTeamId?: number;

	@ManyToOne(() => Team, (team) => team.admins, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	abstract adminOfTeam?: Team;

	@RelationId((user: User) => user.adminOfTeam)
	@Column({ nullable: true })
	abstract readonly adminOfTeamId?: number;

	@OneToMany(() => Stage, (stage) => stage.designer)
	abstract designedStages?: Stage[];

	@RelationId((user: User) => user.designedStages)
	abstract readonly designedStagesIds?: number[];

	@OneToMany(() => MatchStaff, (match) => match.user)
	abstract staffOfMatches?: MatchStaff[];

	@RelationId((user: User) => user.staffOfMatches)
	abstract readonly staffOfMatchesIds?: number[];

	@Column({ default: false })
	abstract isActive: boolean;

	@Column({ default: false })
	abstract isBanned: boolean;
}
