import { backendInstance } from '@/pages/axiosInstance';
import { JwtAndGoogleUserData_Type } from '@/types/user';

export async function getJwtAndGoogleUserData(authCode: string): Promise<JwtAndGoogleUserData_Type> {
	try {
		const response = await backendInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google `, {
			code: authCode
		});
		const jwt = response.data[0];
		const userData = response.data[1];

		sessionStorage.setItem('token', jwt);

		return { jwt, userData };
	} catch (error) {
		console.error(error);
		throw new Error('Failed to getJwtAndGoogleUserData');
	}
}
