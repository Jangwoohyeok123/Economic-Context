// util 타입을 좀 사용해보자 pick ommit
export type OriginSeriess_Type = {
	id: string;
	title: string;
	notes?: string;
	observation_start: string;
	observation_end: string;
	frequency: string;
	frequency_short: string;
	group_popularity?: number;
	popularity: number;
	last_updated?: string;
	realtime_start: string;
	realtime_end: string;
	seasonal_adjustment: string;
	seasonal_adjustment_short: string;
	units: string;
	units_short: string;
};

export type OriginSeriess_Type = {
	id: string;
	realtime_start: string;
	realtime_end: string;
	title: string;
	observation_start: string;
	observation_end: string;
	frequency: string;
	frequency_short: string;
	units: string;
	units_short: string;
	seasonal_adjustment: string;
	seasonal_adjustment_short: string;
	last_updated: string;
	popularity: number;
	group_popularity: number;
	notes?: string;
};

export interface SeriessWithIsActiveInterface extends SeriessType {
	isActive: boolean;
}

export type Category_Type = {
	count: number;
	limit: number;
	offset: number;
	order_by: string;
	realtime_end: string;
	realtime_start: string;
	seriess: OriginSeriess_Type[];
	sort_order: string;
};

export type Observation_Type = {
	date: string;
	realtime_end: string;
	realtime_start: string;
	value: string;
};

export type DateValue_Type = {
	date: Date;
	value: number;
};

export type ObservationResult_Type = {
	realtime_start: string;
	realtime_end: string;
	dataArray: DateValue_Type[];
};

export type ChartDataForSwiper_Type = {
	indicator: SeriessType;
	values: DateValue_Type[];
};
