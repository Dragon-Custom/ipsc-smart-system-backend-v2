import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, Max, Min } from "class-validator";

export class NumericIdParams {
	@Type(() => Number)
	@IsInt()
	@ApiProperty()
	@Max(Number.MAX_SAFE_INTEGER)
	@Min(1)
	id: number;
}
