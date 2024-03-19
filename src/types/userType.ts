interface User {
	isLogin: boolean;
	id: number;
	google_id: string;
	email: string;
	picture_url: string;
	favorite_indicators: string[];
	createAt: Date;
}

/**
	- title: string;
	- seriesId: string;
	- categoryId: number;
	- notes: string;
	- frequency: string;
	- popularity: number;
	- observation_end: string;
	- observation_start: string;
 */
export interface Indicator {
	title: string;
	seriesId: string;
	categoryId: number;
	notes: string;
	frequency: string;
	popularity: number;
	observation_end: string;
	observation_start: string;
}

/**
	- title: string;
	- seriesId: string;
	- categoryId: number;
	- notes: string;
	- frequency: string;
	- popularity: number;
	- observation_end: string;
	- observation_start: string;
	- isActive: boolean;
 */
export interface IndicatorWithIsActive extends Indicator {
	isActive: boolean;
}

/**
	- title: string;
	- seriesId: string;
	- categoryId: number;
	- notes: string;
	- frequency: string;
	- popularity: number;
	- observation_end: string;
	- observation_start: string;
	- isPick: booelan;
 */
export interface IndicatorWithIsPick extends Indicator {
	isPick: boolean;
}

export type ContextNameWithKey = {
	name: string;
	key: number;
};

export default User;
