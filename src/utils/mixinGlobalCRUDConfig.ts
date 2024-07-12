import { CrudOptions } from "@nestjsx/crud";

export function mixinCrudConfig(config: CrudOptions): CrudOptions {
	return {
		...{
			query: {
				alwaysPaginate: true,
				persist: ["id"],
			},
			routes: {
				//HACK: The recover route don't have the ablity to serialize the response due to the nestjsx/crud lib bug.
				//WARN: This route can cause the password or sensitive data to be leaked.
				exclude: ["recoverOneBase"],
			},
			validation: {
				always: true,
				transform: true,
				strictGroups: true,
			},
		},
		...config,
	};
}
