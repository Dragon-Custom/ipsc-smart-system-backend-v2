import { Module } from "@nestjs/common";
import { ProceduralPenaltiesService } from "./procedural-penalties.service";
import { ProceduralPenaltiesController } from "./procedural-penalties.controller";

@Module({
	controllers: [ProceduralPenaltiesController],
	providers: [ProceduralPenaltiesService],
})
export class ProceduralPenaltiesModule {}
