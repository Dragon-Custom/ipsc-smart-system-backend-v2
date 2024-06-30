import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsUUID } from "class-validator";

export class AttachmentDto {
	@ApiProperty({
		description: "Attachment IDs",
		example: [
			"12767765-cd92-4ab3-a8af-228641630888",
			"b0fab4c0-ba6b-4b07-bc76-1bb3a130478c",
		],
	})
	@IsArray()
	@IsUUID("4")
	attachmentIds: string[];
}
