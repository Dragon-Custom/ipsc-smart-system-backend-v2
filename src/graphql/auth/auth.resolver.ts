import { Args, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Query(() => String, { name: "login" })
	login(@Args("name") name: string, @Args("password") password: string) {
		return this.authService.signIn(name, password);
	}

	@UseGuards(AuthGuard)
	@Query(() => String, { name: "testAuth" })
	testAuth() {
		return "this.authService.signIn(name, password)";
	}
}
