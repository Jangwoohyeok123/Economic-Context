import axios from 'axios';

export const fredInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_FRED_BASEURL
});

export const backendInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

backendInstance.interceptors.request.use(
	config => {
		const token = sessionStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);
