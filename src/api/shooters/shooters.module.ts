import { Module } from "@nestjs/common";
import { ShootersService } from "./shooters.service";
import { ShootersController } from "./shooters.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shooter } from "src/entities";

@Module({
	imports: [TypeOrmModule.forFeature([Shooter])],
	controllers: [ShootersController],
	providers: [ShootersService],
})
export class ShootersModule {}
