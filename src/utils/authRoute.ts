import { CanActivate, UseGuards } from "@nestjs/common";
import { RoutesOptions } from "@nestjsx/crud";
import { AuthGuard } from "src/api/auth/auth.guard";

export type Route = keyof RoutesOptions;

export const AuthPreset: Record<"C" | "R" | "U" | "D", Route[]> = {
	C: ["createOneBase", "createManyBase"],
	R: ["getManyBase", "getOneBase"],
	U: ["updateOneBase", "replaceOneBase"],
	D: ["deleteOneBase", "recoverOneBase"],
};

export function CreateAuthRouteGroup(
	routesRequireAuth: Route[],
	// eslint-disable-next-line @typescript-eslint/ban-types
	additionalGurds?: (CanActivate | Function)[],
	additionalRoutes?: RoutesOptions,
): RoutesOptions {
	const routes: RoutesOptions = {};
	routesRequireAuth.forEach((route) => {
		//@ts-expect-error require the little js tricks to enable this feature
		routes[route] = {
			decorators: [UseGuards(AuthGuard, ...additionalGurds)],
		};
	});

	//merge additional routes
	if (additionalRoutes) {
		Object.assign(routes, additionalRoutes);
	}

	return routes;
}
