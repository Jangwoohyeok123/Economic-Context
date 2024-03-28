import { FavoriteIndicator_Type } from './favorite';
import { JournalData_Type } from './journal';

export type ContextNameWithKey_Type = {
	id: number;
	name: string;
};

export type Context_Type = {
	id: number;
	name: string;
	customIndicators: FavoriteIndicator_Type[];
	journals: JournalData_Type[];
	createdAt: Date;
	updatedAt: Date;
};
