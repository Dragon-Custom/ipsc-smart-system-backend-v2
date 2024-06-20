import { Module } from "@nestjs/common";
import { ShootersService } from "./shooters.service";
import { ShootersController } from "./shooters.controller";
import { UsersModule, UsersService } from "../user";

@Module({
	imports: [UsersModule],
	controllers: [ShootersController],
	providers: [ShootersService],
})
export class ShootersModule {}
