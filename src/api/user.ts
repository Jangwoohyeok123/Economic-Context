import { backendUrl } from '@/pages/_app';
import { JwtAndGoogleUserData_Type } from '@/types/user';
import axios from 'axios';
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
const redirectUrl =
	process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL || 'https://dev-economic-context.vercel.app/google-callback';
const secret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_PASSWORD || '';

export async function getJwtAndGoogleUserData(authCode: string): Promise<JwtAndGoogleUserData_Type> {
	const params = new URLSearchParams();
	params.append('code', authCode);
	params.append('client_id', clientId);
	params.append('client_secret', secret);
	params.append('redirect_uri', redirectUrl);
	params.append('grant_type', 'authorization_code');

	try {
		const response = await axios.post(`https://economic-context-api.net/auth/google`, {
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
