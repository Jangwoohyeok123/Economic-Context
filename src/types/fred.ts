export type Indicator_Type = {
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

export interface SeriessWithIsActiveInterface extends Indicator_Type {
	isActive: boolean;
}

export type Category_Type = {
	count: number;
	limit: number;
	offset: number;
	order_by: string;
	realtime_end: string;
	realtime_start: string;
	seriess: Indicator_Type[];
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
	value: number | string;
};

export type ObservationResult_Type = {
	realtime_start: string;
	realtime_end: string;
	dataArray: DateValue_Type[];
};

export type ChartDataForSwiper_Type = {
	indicator: Indicator_Type;
	values: DateValue_Type[];
};
