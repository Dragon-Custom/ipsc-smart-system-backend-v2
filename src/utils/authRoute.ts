import { CanActivate, UseGuards } from "@nestjs/common";
import { BaseRouteOptions, RoutesOptions } from "@nestjsx/crud";

export type Route = keyof RoutesOptions;

export const RouteOperationPreset: Record<"C" | "R" | "U" | "D", Route[]> = {
	C: ["createOneBase", "createManyBase"],
	R: ["getManyBase", "getOneBase"],
	U: ["updateOneBase", "replaceOneBase"],
	D: ["deleteOneBase", "recoverOneBase"],
};

export type AdditionalRoutes = {
	route: Route[];
	options: Partial<BaseRouteOptions>;
	guard?: CanActivate[];
}[];

export function CreateRouteGroup(
	additionalRoutes: AdditionalRoutes,
): RoutesOptions {
	const routes: RoutesOptions = {};
	//merge additional routes
	additionalRoutes.forEach((route) => {
		route.route.forEach((r) => {
			route.options.decorators = [
				...route.options.decorators,
				UseGuards(...route.guard),
			];
			//@ts-expect-error dwa
			routes[r] = route.options;
		});
	});

	return routes;
}
