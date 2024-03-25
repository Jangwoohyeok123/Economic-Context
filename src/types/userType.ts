import { SeriessType } from './fredType';

export type Indicator = Omit<
	SeriessType,
	| 'id'
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
	seriesId: string;
	categoryId: number;
};

interface User {
	isLogin: boolean;
	id: number;
	google_id: string;
	email: string;
	picture_url: string;
	favorite_indicators: string[];
	createAt: Date;
}

export interface IndicatorWithIsActive extends Indicator {
	isActive: boolean;
}

export interface IndicatorWithIsPick extends Indicator {
	isPick: boolean;
}

export type ContextIdWithName = {
	id: number;
	name: string;
};

export type ContextType = {
	createdAt: Date;
	customIndicators: Indicator[];
	id: number;
	journal: Journal[];
	name: string;
	updatedAt: Date;
};

export interface Journal {
	title: string;
	body: string;
}

export interface JournalResponseData extends Journal {
	id: number;
	createdAt: string;
}

export default User;
