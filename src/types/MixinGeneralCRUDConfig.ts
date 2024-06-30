import { CrudOptions } from "@nestjsx/crud";

export function mixinCrudConfig(option: CrudOptions): CrudOptions {
	return {
		...option,
		...{
			validation: {
				always: true,
				strictGroups: true,
				transform: true,
			},
			query: {
				persist: ["id"],
			},
		},
	};
}
