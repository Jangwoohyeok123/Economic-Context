// util 타입을 좀 사용해보자 pick ommit
export type Seriess_Type = {
	frequency: string;
	frequency_short: string;
	group_popularity: number;
	id: string;
	last_updated: string;
	notes?: string;
	observation_end: string;
	observation_start: string;
	popularity: number;
	realtime_end: string;
	realtime_start: string;
	seasonal_adjustment: string;
	seasonal_adjustment_short: string;
	title: string;
	units: string;
	units_short: string;
};

export interface SeriessWithIsActive_Interface extends Seriess_Type {
	isActive: boolean;
}

export type Category_Type = {
	count: number;
	limit: number;
	offset: number;
	order_by: string;
	realtime_end: string;
	realtime_start: string;
	seriess: Seriess_Type[];
	sort_order: string;
};
