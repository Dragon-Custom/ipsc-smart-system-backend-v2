import { Module } from "@nestjs/common";
import { ShootersService } from "./shooters.service";
import { ShootersController } from "./shooters.controller";
import { UsersService } from "../user";

@Module({
	imports: [],
	controllers: [ShootersController],
	providers: [ShootersService, UsersService],
	exports: [ShootersService],
})
export class ShootersModule {}
