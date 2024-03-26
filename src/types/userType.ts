import { Favorite_Type, JournalData_Type } from './backendType';
import { OriginSeriess_Type } from './fredType';

export type User_Type = {
	isLogin: boolean;
	id: number;
	google_id: string;
	email: string;
	picture_url: string;
	favorite_indicators: string[];
	createAt: string;
};

export type IndicatorWithIsActive_Type = Favorite_Type & {
	isActive: boolean;
};

export type IndicatorWithIsPick_Type = Favorite_Type & {
	isPick: boolean;
};

export type ContextIdWithName_Type = {
	id: number;
	name: string;
};

export type Context_Type = {
	createdAt: string;
	customIndicators: Favorite_Type[];
	id: number;
	journal: JournalData_Type[];
	name: string;
	updatedAt: string;
};
