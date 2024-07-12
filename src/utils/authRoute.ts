import { CanActivate, UseGuards } from "@nestjs/common";
import { BaseRouteOptions, RoutesOptions } from "@nestjsx/crud";
import { AuthGuard } from "src/api/auth/auth.guard";

export type Route = keyof RoutesOptions;

export const AuthPreset: Record<"C" | "R" | "U" | "D", Route[]> = {
	C: ["createOneBase", "createManyBase"],
	R: ["getManyBase", "getOneBase"],
	U: ["updateOneBase", "replaceOneBase"],
	D: ["deleteOneBase", "recoverOneBase"],
};

export type AdditionalRoutes = {
	route: Route[];
	options: Partial<BaseRouteOptions>;
}[];

export function CreateAuthRouteGroup(
	additionalRoutes?: AdditionalRoutes,
): RoutesOptions {
	const routes: RoutesOptions = {};
	//merge additional routes
	if (additionalRoutes) {
		additionalRoutes.forEach((route) => {
			route.route.forEach((r) => {
				//@ts-expect-error dwa
				routes[r] = {
					...routes[r],
					...route.options,
				};
			});
		});
	}
	console.log(routes);

	return routes;
}
