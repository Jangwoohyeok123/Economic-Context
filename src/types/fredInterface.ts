// util 타입을 좀 사용해보자 pick ommit
export type Seriess = {
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

export interface EnhancedSeriess extends Seriess {
	isActive: boolean;
}

export interface Category {
	count: number;
	limit: number;
	offset: number;
	order_by: string;
	realtime_end: string;
	realtime_start: string;
	seriess: Seriess[];
	sort_order: string;
}
