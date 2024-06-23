import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import config from "./config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const swaggerConfig = new DocumentBuilder()
		.setTitle("Cats example")
		.setDescription("The cats API description")
		.setVersion("1.0")
		.addTag("cats")
		.build();
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("api", app, document);
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	);
	app.useGlobalInterceptors(
		new ClassSerializerInterceptor(app.get(Reflector), {
			// excludeExtraneousValues: true,
		}),
	);
	await app.listen(config.server.port);
}
bootstrap();
