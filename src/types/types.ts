export interface IndicatorCard {
	title: string;
	seriesId: string;
}

export interface SavedCardSet {
	interest: IndicatorCard[];
	exchange: IndicatorCard[];
	consume: IndicatorCard[];
	production: IndicatorCard[];
}

export interface CheckedCardSet {
	interest: IndicatorCard[];
	exchange: IndicatorCard[];
	consume: IndicatorCard[];
	production: IndicatorCard[];
}

export interface Context {
	contextId: string;
	name: string;
	interest: IndicatorCard[];
	exchange: IndicatorCard[];
	consume: IndicatorCard[];
	production: IndicatorCard[];
}

export interface Post {
	postId: string;
	title: string;
	body: string;
	createAt: Date;
	updatedAt: Date;
}

export interface MyContexts {
	Contexts: Context[];
}
