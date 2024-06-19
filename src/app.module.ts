import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./config";
import { DataSource } from "typeorm";
import { Shooter, Team, User } from "./entities";
@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "mysql",
			host: config.database.host,
			port: config.database.port,
			username: config.database.username,
			password: config.database.password,
			database: config.database.database,
			entities: [User, Shooter, Team],
			synchronize: process.env.NODE_ENV !== "production",
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
