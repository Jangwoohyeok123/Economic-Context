// util 타입을 좀 사용해보자 pick ommit
export type Seriess_Type = {
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

export type Observation = {
	date: string;
	realtime_end: string;
	realtime_start: string;
	value: string;
};
