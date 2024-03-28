export type User_Type = {
	isLogin: boolean;
	id: number;
	google_id: string;
	email: string;
	picture_url: string;
	favorite_indicators: string[];
	createAt: string;
};

export type JwtAndGoogleUserData_Type = {
	jwt: string;
	userData: User_Type;
};
