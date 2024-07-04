import { Module } from "@nestjs/common";
import { StagesService } from "./stages.service";
import { StagesController } from "./stages.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Stage } from "src/entities";

@Module({
	imports: [TypeOrmModule.forFeature([Stage])],
	controllers: [StagesController],
	providers: [StagesService],
})
export class StagesModule {}
