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

export interface IndicatorWithIsActive {
	title: string;
	seriesId: string;
	categoryId: number;
	isActive: boolean;
}

export default User;
