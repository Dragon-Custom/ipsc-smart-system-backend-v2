import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
	@ApiProperty({
		description: "Email of the user",
		example: "example@example.com",
	})
	@IsEmail()
	email: string;

	@ApiProperty({
		description: "Password of the user",
		example: "password123",
	})
	@IsString()
	password: string;
}

export class LoginResponseDto {
	@ApiProperty({
		description: "JWT token of the user",
		example:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
	})
	@IsString()
	access_token: string;
}

export type RequestWithUser<T> = T & {
	user: {
		/**
		 * user id
		 */
		sub: number;
		username: string;
		email: string;
		isSystemAdmin?: true;
		iat: number;
		exp: number;
	};
};
