import { Module } from "@nestjs/common";
import { ShooterService } from "./shooter.service";
import { ShooterResolver } from "./shooter.resolver";
import { Shooter } from "src/entities";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [TypeOrmModule.forFeature([Shooter])],
	providers: [ShooterResolver, ShooterService],
})
export class ShooterModule {}
