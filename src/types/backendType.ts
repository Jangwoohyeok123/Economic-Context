/*
  promise 에 generic 으로 사용될 response 타입을 지정합니다.
  promise 의 result 는 제너릭타입으로 지정됩니다.
*/

import { OriginSeriess_Type } from './fredType';
import { User_Type } from './userType';

export type JwtAndGoogleUserData_Type = {
	jwt: string;
	userData: User_Type;
};

export type Favorite_Type = Pick<
	OriginSeriess_Type,
	'frequency' | 'notes' | 'observation_end' | 'observation_start' | 'popularity' | 'title'
> & {
	seriesId: string;
	categoryId: number;
};

export type Journal_Type = {
	id: number;
	title: string;
	body: string;
	createdAt: string;
	updatedAt: string;
};

export type ContextNameWithKey_Type = {
	id: number;
	name: string;
};

export type Context_Type = {
	id: number;
	name: string;
	customIndicators: Favorite_Type[];
	journals: Journal_Type[];
	createdAt: Date;
	updatedAt: Date;
};
