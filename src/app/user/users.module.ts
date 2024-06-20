import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { ShootersService } from "../shooters/shooters.service";

@Module({
	imports: [],
	controllers: [UsersController],
	providers: [UsersService, ShootersService],
	exports: [UsersService],
})
export class UsersModule {}
