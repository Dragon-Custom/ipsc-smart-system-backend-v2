import { Module } from "@nestjs/common";
import { ProceduralPenaltiesService } from "./procedural-penalties.service";
import { ProceduralPenaltiesController } from "./procedural-penalties.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProceduralPenalty } from "src/entities";

@Module({
	imports: [TypeOrmModule.forFeature([ProceduralPenalty])],
	controllers: [ProceduralPenaltiesController],
	providers: [ProceduralPenaltiesService],
})
export class ProceduralPenaltiesModule {}
