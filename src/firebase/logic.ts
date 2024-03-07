import { get, getDatabase, push, ref, remove, set } from 'firebase/database';
import app from './firebaseConfig';

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
