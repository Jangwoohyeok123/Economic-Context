import app from './firebaseConfig';
import { get, getDatabase, push, ref, remove, set } from 'firebase/database';

export const addFavoriteIndicator = (categoryId: number, seriesId: string, title: string) => {
	const db = getDatabase(app);
	const userId = 1;
	const favoriteDocRef = ref(db, `/user/favorite/${userId}`);

	get(favoriteDocRef).then(snapshot => {
		let isExists = false;

		snapshot.forEach(childrenSnapshot => {
			const childData = childrenSnapshot.val();

			if (childData.seriesId === seriesId) {
				isExists = true;
			}
		});

		if (!isExists) {
			const newFavoriteRef = push(favoriteDocRef);
			set(newFavoriteRef, {
				seriesId: seriesId,
				categoryId: categoryId,
				title: title
			})
				.then(() => {
					alert('save 성공');
				})
				.catch(err => {
					alert('error: ' + err.message);
				});
		}
	});
};

export const deleteFavoriteIndicator = async (userId: number = 1, seriesId: string) => {
	const db = getDatabase(app);
	const favoriteDocRef = ref(db, `/user/favorite/${userId}`);

	try {
		const document = await get(favoriteDocRef);
		if (document.exists()) {
			document.forEach(childSnapshot => {
				const indicator = childSnapshot.val();
				if (indicator.seriesId === seriesId) {
					const itemRef = childSnapshot.ref;
					remove(itemRef)
						.then(() => alert(`Item with seriesId ${seriesId} removed`))
						.catch(error => console.error('Error removing item:', error));
				}
			});
		} else {
			console.log('No data found');
		}
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};

export const deleteFavorite = async (userId: number, seriresId: string) => {
	const db = getDatabase(app); // firebase Instance 갖고오기
	const favoriteDocRef = ref(db, `/user/favorite/${userId}`); // 경로 생성
	const snapshot = await get(favoriteDocRef); // get 한 결과를 snapshot 으로 전달받기 get 함수는 then 처리까지 스스로 처리함

	// seriesId 가 일치하는 snapshot key 를 찾는다.
	if (snapshot.exists()) {
		let targetKeyToRemove = null;
		snapshot.forEach(childSnapshot => {
			const favorite = childSnapshot.val();
			console.log(childSnapshot.key);

			if (favorite.seriesId === seriresId) {
				targetKeyToRemove = childSnapshot.key;
			}
		});

		if (targetKeyToRemove) {
			const refToRemove = ref(db, `user/favorite/${userId}/${targetKeyToRemove}`);
			await remove(refToRemove);
		}
	}
};

// context
export const addContextIndicator = (categoryId: number, seriesId: string, title: string) => {
	const db = getDatabase(app);
	const userId = 1;
	const contextDocRef = ref(db, `/user/context/${userId}`);

	get(contextDocRef).then(snapshot => {
		let isExists = false;

		snapshot.forEach(childrenSnapshot => {
			const childData = childrenSnapshot.val();

			if (childData.seriesId === seriesId) {
				isExists = true;
			}
		});

		if (!isExists) {
			const newFavoriteRef = push(contextDocRef);
			set(newFavoriteRef, {
				seriesId: seriesId,
				categoryId: categoryId,
				title: title
			})
				.then(() => {
					alert('save 성공');
				})
				.catch(err => {
					alert('error: ' + err.message);
				});
		}
	});
};
