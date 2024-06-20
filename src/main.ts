import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import config from "./config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		snapshot: true,
	});

	const swaggerConfig = new DocumentBuilder()
		.setTitle("IPSC Smart system example")
		.setDescription("IPSC Smart system API description")
		.setVersion("1.0")
		.build();
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("api", app, document);
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	);
	await app.listen(config.server.port);
}
bootstrap();
