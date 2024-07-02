import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import config from "./config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const opConfig = new DocumentBuilder()
		.setTitle("Cats example")
		.setDescription("The cats API description")
		.setVersion("1.0")
		.build();
	const document = SwaggerModule.createDocument(app, opConfig);
	SwaggerModule.setup("api", app, document, {
		jsonDocumentUrl: "api.json",
	});

	await app.listen(config.server.port);
}
bootstrap();
