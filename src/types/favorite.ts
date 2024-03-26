import { Indicator_Type } from './fred';

export type FavoriteIndicator_Type = Pick<
	Indicator_Type,
	'frequency' | 'notes' | 'observation_end' | 'observation_start' | 'popularity' | 'title'
> & {
	seriesId: string;
	categoryId: number;
};

export type FavoriteIndicatorWithIsPick_Type = FavoriteIndicator_Type & {
	isPick: boolean;
};

export type FavoriteIndicatorWithIsActive_Type = FavoriteIndicator_Type & {
	isActive: boolean;
};
