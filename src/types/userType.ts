interface User {
	isLogin: boolean;
	id: number;
	google_id: string;
	email: string;
	picture_url: string;
	favorite_indicators: string[];
	createAt: Date;
}

export interface Indicator {
	title: string;
	seriesId: string;
	categoryId: number;
}

/**
	- title: string;
	- seriesId: string;
	- categoryId: number;
	- isActive: boolean;
 */
export interface IndicatorWithIsActive extends Indicator {
	isActive: boolean;
}

/**
	- title: string;
	- seriesId: string;
	- categoryId: number;
	- isPick: booelan;
 */
export interface IndicatorWithIsPick extends Indicator {
	isPick: boolean;
}

export default User;
