import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { UserModule } from "../user";
import { JwtModule } from "@nestjs/jwt";
import config from "src/config";

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
			secret: config.security.jwt.jwtSecret,
			signOptions: { expiresIn: config.security.jwt.jwtExpirationTime },
		}),
	],
	providers: [AuthResolver, AuthService],
})
export class AuthModule {}
