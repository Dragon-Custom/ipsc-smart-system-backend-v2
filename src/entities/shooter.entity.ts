import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	AfterUpdate,
} from "typeorm";

@Entity()
export class Shooter {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	fullName: string;
	@AfterUpdate()
	setFullName() {
		this.fullName = this.firstName + " " + this.lastName;
	}

	@CreateDateColumn()
	createdAt: Date;

	@Column({ default: false })
	isActive: boolean;
}
