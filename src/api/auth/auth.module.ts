import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import config from "src/config";

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
			secret: config.security.jwt.secret,
			signOptions: { expiresIn: config.security.jwt.expiresIn },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
