import { CrudOptions } from "@nestjsx/crud";

export function mixinCrudConfig(option: CrudOptions): CrudOptions {
	return {
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
		...option,
	};
}
