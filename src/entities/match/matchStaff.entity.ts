import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../user.entity";
import { Match } from "./match.entity";

export enum StuffRole {
	RO = "RO",
	RM = "RM",
	CRO = "CRO",
	SO = "SO",
	QM = "QM",
	MD = "MD",
}

@Entity()
export class MatchStaff {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "enum",
		enum: StuffRole,
	})
	role: StuffRole;

	@ManyToOne(() => Match, (match) => match.staffs)
	match: Match;

	@ManyToOne(() => User, (user) => user.stuffOfMatches)
	user: User;
}
