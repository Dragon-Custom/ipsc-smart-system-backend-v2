import { NestFactory, Reflector } from "@nestjs/core";
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
		// updateOneBase: {
		// 	allowParamsOverride: true,
		// },
		// deleteOneBase: {
		// 	returnDeleted: true,
		// },
	},
});

import { AppModule } from "./app.module";
import { ClassSerializerInterceptor } from "@nestjs/common";
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

	app.useGlobalInterceptors(
		new ClassSerializerInterceptor(app.get(Reflector), {
			exposeDefaultValues: true,
			exposeUnsetFields: true,
			enableImplicitConversion: true,
			excludeExtraneousValues: true,
		}),
	);

	await app.listen(config.server.port);
}
bootstrap();
