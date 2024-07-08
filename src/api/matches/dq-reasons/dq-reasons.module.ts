import { Module } from "@nestjs/common";
import { DqReasonsService } from "./dq-reasons.service";
import { DqReasonsController } from "./dq-reasons.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DQReason } from "src/entities";

@Module({
	imports: [TypeOrmModule.forFeature([DQReason])],
	controllers: [DqReasonsController],
	providers: [DqReasonsService],
})
export class DqReasonsModule {}
