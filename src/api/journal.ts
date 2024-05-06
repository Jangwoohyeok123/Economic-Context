import { backendUrl } from '@/pages/_app';
import { backendInstance } from '@/api/axiosInstance';
import { JournalData_Type, JournalParams_Type } from '@/types/journal';
import axios from 'axios';

export const getContextJournal_List = async (contextId: number): Promise<JournalData_Type[]> => {
	try {
		const response = await backendInstance.get(`/journal/${contextId}`);
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
		const response = await backendInstance.get(`/journal`);
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
		const token = sessionStorage.getItem('token');
		if (!token) {
			throw new Error('No token found in sessionStorage');
		}
		await backendInstance.post(`/journal/${userId}/${contextId}`, journalDataParams, {
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
		await backendInstance.delete(`/journal/${journalId}`);
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
		await backendInstance.delete(`/journal/${contextId}`);
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
		await backendInstance.put(`/journal/${journalId}`, {
			title: title,
			body: body
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
