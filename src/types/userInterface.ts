interface User {
	isLogin: boolean;
	id: number | string;
	google_id: string;
	email: string;
	picture_url: string;
	favorite_indicators: string[];
	createAt: Date;
}

export default User;
