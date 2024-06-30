import { FilterOperator, FilterSuffix } from "nestjs-paginate";

export const NumbericFilterPresets = [
	FilterSuffix.NOT,
	FilterOperator.EQ,
	FilterOperator.GTE,
	FilterOperator.GT,
	FilterOperator.LTE,
	FilterOperator.LT,
	FilterOperator.BTW,
	FilterOperator.IN,
];

export const StringFilterPresets = [
	FilterSuffix.NOT,
	FilterOperator.CONTAINS,
	FilterOperator.SW,
	FilterOperator.EQ,
	FilterOperator.ILIKE,
	FilterOperator.IN,
];
