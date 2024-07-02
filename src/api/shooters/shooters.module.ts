import { Module } from "@nestjs/common";
import { ShootersService } from "./shooters.service";
import { ShootersController } from "./shooters.controller";

@Module({
	controllers: [ShootersController],
	providers: [ShootersService],
})
export class ShootersModule {}
