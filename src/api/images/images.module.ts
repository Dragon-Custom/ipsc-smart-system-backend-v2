import { Module } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { ImagesController } from "./images.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Image } from "src/entities";

@Module({
	imports: [TypeOrmModule.forFeature([Image])],
	controllers: [ImagesController],
	providers: [ImagesService],
})
export class ImagesModule {}
