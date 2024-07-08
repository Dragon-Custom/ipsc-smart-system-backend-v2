import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	RelationId,
	Index,
} from "typeorm";
import { User } from "../user.entity";
import { Match } from "./match.entity";

export enum StaffRole {
	RO = "RO",
	RM = "RM",
	CRO = "CRO",
	SO = "SO",
	QM = "QM",
	MD = "MD",
}

@Entity()
@Index(["matchId", "userId"], {
	unique: true,
})
export abstract class MatchStaff {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@Column({
		type: "enum",
		enum: StaffRole,
	})
	abstract role: StaffRole;

	@ManyToOne(() => Match, (match) => match.matchStaffs, {
		nullable: false,
		onDelete: "CASCADE",
	})
	abstract match: Match;

	@RelationId((matchStaff: MatchStaff) => matchStaff.match)
	@Column({ nullable: false })
	abstract readonly matchId: number;

	@ManyToOne(() => User, (user) => user.staffOfMatches, {
		nullable: false,
		onDelete: "CASCADE",
	})
	abstract user: User;

	@RelationId((matchStaff: MatchStaff) => matchStaff.user)
	@Column({ nullable: false })
	abstract readonly userId: number;
}
