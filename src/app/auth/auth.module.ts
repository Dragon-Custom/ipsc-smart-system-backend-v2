import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user";
import { JwtModule } from "@nestjs/jwt";
import config from "src/config";

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
			secret: config.api.jwt.jwtSecret,
			signOptions: { expiresIn: config.api.jwt.expiresIn },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
