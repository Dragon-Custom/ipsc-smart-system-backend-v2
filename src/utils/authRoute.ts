import { BaseRouteOptions, RoutesOptions } from "@nestjsx/crud";

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
	additionalRoutes: AdditionalRoutes,
): RoutesOptions {
	const routes: RoutesOptions = {};
	//merge additional routes
	additionalRoutes.forEach((route) => {
		route.route.forEach((r) => {
			//@ts-expect-error dwa
			routes[r] = route.options;
		});
	});

	return routes;
}
