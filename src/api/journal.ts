import { backendUrl } from '@/pages/_app';
import { JournalData_Type, JournalParams_Type } from '@/types/journal';
import axios from 'axios';

export const getContextJournal_List = async (contextId: number): Promise<JournalData_Type[]> => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}
		const response = await axios.get(`${backendUrl}/journal/${contextId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return response.data;
	} catch (error: any) {
		if (error.response) {
			console.error(`Error: ${error.response.status} - ${error.response.data}`);
		} else if (error.request) {
			console.error('Error: No response from server.');
		} else {
			console.error('Error: ', error.message);
		}

		throw new Error('Failed to fetch');
	}
};

export const getAllJournal = async () => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}
		const response = await axios.get(`${backendUrl}/journal`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return response.data;
	} catch (error: any) {
		if (error.response) {
			console.error(`Error: ${error.response.status} - ${error.response.data}`);
		} else if (error.request) {
			console.error('Error: No response from server.');
		} else {
			console.error('Error: ', error.message);
		}

		throw new Error('Failed to fetch');
	}
};

export const addJournal = async (userId: number, contextId: number, journalDataParams: JournalParams_Type) => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}
		await axios.post(`${backendUrl}/journal/${userId}/${contextId}`, journalDataParams, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	} catch (error: any) {
		if (error.response) {
			console.error(`Error: ${error.response.status} - ${error.response.data}`);
		} else if (error.request) {
			console.error('Error: No response from server.');
		} else {
			console.error('Error: ', error.message);
		}
	}
};

export const deleteJournal = async (journalId: number) => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}
		await axios.delete(`${backendUrl}/journal/${journalId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	} catch (error: any) {
		if (error.response) {
			console.error(`Error: ${error.response.status} - ${error.response.data}`);
		} else if (error.request) {
			console.error('Error: No response from server.');
		} else {
			console.error('Error: ', error.message);
		}
	}
};

export const deleteJournal_List = async (contextId: number) => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}
		await axios.delete(`${backendUrl}/journal/${contextId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	} catch (error: any) {
		if (error.response) {
			console.error(`Error: ${error.response.status} - ${error.response.data}`);
		} else if (error.request) {
			console.error('Error: No response from server.');
		} else {
			console.error('Error: ', error.message);
		}
	}
};

export const modifyJournal = async (journalId: number, title: string, body: string) => {
	try {
		if (typeof window === 'undefined') {
			throw new Error('This function can only be used in the client-side');
		}

		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}
		await axios.put(
			`${backendUrl}/journal/${journalId}`,
			{
				title: title,
				body: body
			},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
	} catch (error: any) {
		if (error.response) {
			console.error(`Error: ${error.response.status} - ${error.response.data}`);
		} else if (error.request) {
			console.error('Error: No response from server.');
		} else {
			console.error('Error: ', error.message);
		}
	}
};
