import { UseGuards } from "@nestjs/common";
import { RoutesOptions } from "@nestjsx/crud";
import { AuthGuard } from "src/api/auth/auth.guard";

export type Route = keyof RoutesOptions;

export function CreateAuthRouteGroup(
	routesRequireAuth: Route[],
): RoutesOptions {
	const routes: RoutesOptions = {};
	routesRequireAuth.forEach((route) => {
		//@ts-expect-error require the little js tricks to enable this feature
		routes[route] = {
			decorators: [UseGuards(AuthGuard)],
		};
	});

	return routes;
}
