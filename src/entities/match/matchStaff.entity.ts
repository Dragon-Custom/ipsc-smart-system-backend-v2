import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	RelationId,
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
export abstract class MatchStaff {
	@PrimaryGeneratedColumn()
	abstract id: number;

	@Column({
		type: "enum",
		enum: StaffRole,
	})
	abstract role: StaffRole;

	@ManyToOne(() => Match, (match) => match.matchStaffs)
	abstract match: Match;

	@RelationId((matchStaff: MatchStaff) => matchStaff.match)
	abstract readonly matchId: number;

	@ManyToOne(() => User, (user) => user.stuffOfMatches)
	abstract user: User;

	@RelationId((matchStaff: MatchStaff) => matchStaff.user)
	abstract readonly userId: number;
}
