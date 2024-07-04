import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, LoginResponseDto, RequestWithUser } from "./auth.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "./auth.guard";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@ApiResponse({
		status: 200,
		description: "User logged in successfully.",
		type: LoginResponseDto,
	})
	@Post("login")
	signIn(@Body() loginData: LoginDto) {
		return this.authService.signIn(loginData.email, loginData.password);
	}

	@UseGuards(AuthGuard)
	@Get("me")
	getProfile(@Request() req: RequestWithUser) {
		console.log(req.user);
		return req.user;
	}
}
