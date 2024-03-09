import app from './firebaseConfig';
import { Indicator } from '@/types/dbInterface';
import { get, getDatabase, push, ref, remove, set } from 'firebase/database';

interface Context {
	name: string;
	indicators: Indicator[];
}

// post context/:userId    body: {name: string, indicators: Indicator[]};
export const addContext = async (contextName: string, indicators: Indicator[]) => {
	const db = getDatabase(app);
	const userId = 1; // 현재 사용자 ID
	const contextDocRef = ref(db, `context/${userId}`);

	try {
		const snapshot = await get(contextDocRef);
		let isExists = false;

		snapshot.forEach(childSnapshot => {
			const childData = childSnapshot.val();
			if (childData.name === contextName) {
				isExists = true;
			}
		});

		if (!isExists) {
			const newContextRef = push(contextDocRef);
			await set(newContextRef, {
				name: contextName,
				indicators: indicators
			});
			alert('Context 저장 성공');
		} else {
			alert('Context가 이미 존재합니다.');
		}
	} catch (err) {
		alert('Error: ' + err.message);
	}
};
