import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToMany,
} from "typeorm";

@Entity()
export class Stage {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn({ nullable: false })
	createAt: Date;
}
