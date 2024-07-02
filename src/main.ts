import { NestFactory, Reflector } from "@nestjs/core";
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
		// HACK: Due to a bug in the crud package, we need to exclude the recoverOneBase route
		// WARN: The crud lib won't exclude the password while returning the user object.
		// To fix this, we now need to use the exclude option in the crud config.
		exclude: ["recoverOneBase"],
	},
});

import { AppModule } from "./app.module";
import config from "./config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ClassSerializerInterceptor } from "@nestjs/common";

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

	app.useGlobalInterceptors(
		new ClassSerializerInterceptor(app.get(Reflector), {
			// exposeDefaultValues: true,
			// exposeUnsetFields: true,
			// enableImplicitConversion: true,
			excludeExtraneousValues: true,
			enableCircularCheck: true,
			strategy: "exposeAll",
		}),
	);

	await app.listen(config.server.port);
}
bootstrap();
