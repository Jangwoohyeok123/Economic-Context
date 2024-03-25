import { Journal_Type } from './backendType';
import { OriginSeriess_Type } from './fredType';

export type Indicator_Type = Pick<
	OriginSeriess_Type,
	'title' | 'notes' | 'observation_start' | 'observation_end' | 'frequency' | 'popularity'
> & {
	seriesId: string;
	categoryId: number;
};

export type Favorite_Type = Pick<
	OriginSeriess_Type,
	'frequency' | 'notes' | 'observation_end' | 'observation_start' | 'popularity' | 'title'
> & {
	seriesId: string;
	categoryId: number;
};

export type User_Type = {
	isLogin: boolean;
	id: number;
	google_id: string;
	email: string;
	picture_url: string;
	favorite_indicators: string[];
	createAt: string;
};

export type IndicatorWithIsActive_Type = Indicator_Type & {
	isActive: boolean;
};

export type IndicatorWithIsPick_Type = Indicator_Type & {
	isPick: boolean;
};

export type ContextIdWithName_Type = {
	id: number;
	name: string;
};

export type Context_Type = {
	createdAt: string;
	customIndicators: Indicator_Type[];
	id: number;
	journal: Journal_Type[];
	name: string;
	updatedAt: string;
};
