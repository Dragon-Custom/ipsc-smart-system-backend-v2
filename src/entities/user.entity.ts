import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
} from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	nickname: string;

	@Column()
	email: string;

	@Column()
	encryptedPassword: string;

	@CreateDateColumn()
	createdAt: Date;

	@Column({ default: false })
	isActive: boolean;
}
