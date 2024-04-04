import { backendUrl } from '@/pages/_app';
import { JwtAndGoogleUserData_Type } from '@/types/user';
import axios from 'axios';

export async function getJwtAndGoogleUserData(authCode: string): Promise<JwtAndGoogleUserData_Type> {
	try {
		const response = await axios.post(`https://economic-loadbalancer-692626365.ap-northeast-2.elb.amazonaws.com`, {
			code: authCode
		});
		const jwt = response.data[0];
		const userData = response.data[1];

		return { jwt, userData };
	} catch (error) {
		console.error(error);
		console.log('authCode in getJwt: ', authCode);
		throw new Error('Failed to getJwtAndGoogleUserData');
	}
}
