import {
	Body,
	Controller,
	Post,
	HttpCode,
	HttpStatus,
	UseGuards,
	Get,
	Request,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "./auth.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post("login")
	login(@Body() signInDto: LoginDTO) {
		return this.authService.login(signInDto.email, signInDto.password);
	}

	@UseGuards(AuthGuard)
	@Get("profile")
	getProfile(@Request() req) {
		return req.user;
	}
}
