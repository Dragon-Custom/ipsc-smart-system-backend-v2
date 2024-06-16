import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./config";
import { DataSource } from "typeorm";
import { Class, Shooter, Team, Division } from "./entities";
import { ShooterCategory } from "./entities/shooter/shooter.category.entity";
@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "mysql",
			host: config.database.host,
			port: config.database.port,
			username: config.database.username,
			password: config.database.password,
			database: config.database.database,
			entities: [Division, Shooter, Team, Class, ShooterCategory],
			synchronize: process.env.NODE_ENV !== "production",
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
