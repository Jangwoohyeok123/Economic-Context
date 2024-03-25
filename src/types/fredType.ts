// util 타입을 좀 사용해보자 pick ommit
export type SeriessType = {
	id: string;
	title: string;
	notes?: string;
	observation_start?: string;
	observation_end?: string;
	frequency?: string;
	frequency_short?: string;
	group_popularity?: number;
	popularity?: number;
	last_updated?: string;
	realtime_start?: string;
	realtime_end?: string;
	seasonal_adjustment?: string;
	seasonal_adjustment_short?: string;
	units?: string;
	units_short?: string;
};

type Indicator = Omit<
	SeriessType,
	| 'frequency_short'
	| 'group_popularity'
	| 'last_updated'
	| 'realtime_start'
	| 'realtime_end'
	| 'seasonal_adjustment'
	| 'seasonal_adjustment_short'
	| 'units'
	| 'units_short'
> & {
	categoryId: number;
};
/**
  id: string;
	title: string;
	notes: string;
	observation_start: string;
	observation_end: string;
	frequency: string;
	popularity: number;
	categoryId: number;
*/

export interface SeriessWithIsActiveInterface extends SeriessType {
	isActive: boolean;
}

export type CategoryType = {
	count: number;
	limit: number;
	offset: number;
	order_by: string;
	realtime_end: string;
	realtime_start: string;
	seriess: SeriessType[];
	sort_order: string;
};

export type Observation = {
	date: string;
	realtime_end: string;
	realtime_start: string;
	value: string;
};

export type Value = {
	date: Date;
	value: number;
};

export type ChartDataForSwiper = {
	indicator: SeriessType;
	values: Value[];
};
