import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import config from "./config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { CrudConfigService } from "@nestjsx/crud";

CrudConfigService.load({
	query: {
		limit: 25,
		cache: 2000,
		alwaysPaginate: true,
		maxLimit: 100,
		softDelete: true,
	},
	params: {
		id: {
			field: "id",
			type: "number",
			primary: true,
		},
	},
	routes: {
		updateOneBase: {
			allowParamsOverride: true,
		},
		deleteOneBase: {
			returnDeleted: true,
		},
	},
});

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const openApiConfig = new DocumentBuilder()
		.setTitle("Cats example")
		.setDescription("The cats API description")
		.setVersion("1.0")
		.addTag("cats")
		.build();
	const document = SwaggerModule.createDocument(app, openApiConfig);
	SwaggerModule.setup("api", app, document);

	await app.listen(config.server.port);
}
bootstrap();
