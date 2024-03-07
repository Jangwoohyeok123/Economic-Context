import clsx from 'clsx';
import { useState } from 'react';
import { roboto, poppins } from '../_app';
import Menu from '@/components/menu/Menu';
import styles from './Dashboard.module.scss';
import MyContext from '@/components/myContext/MyContext';
import Dashheader from '@/components/dashheader/DashHeader';
import Indicators from '@/components/indicators/Indicators';
import { useQuery } from '@tanstack/react-query';
import queryKey from '@/const/queryKey';
import { getDatabase, ref, get } from 'firebase/database';
import app from '@/firebase/firebaseConfig';

type Favorite = {
	title: string;
	seriesId: string;
	categoryId: number;
};

const fetchFavoritesByUserId = async (userId: number): Promise<Favorite[]> => {
	const db = getDatabase(app);
	const favoritesRef = ref(db, `/user/favorite/${userId}`);
	const favoriteArray: Favorite[] = [];

	await get(favoritesRef)
		.then(snapshot => {
			if (snapshot.exists()) {
				const favoritesData = snapshot.val();
				favoriteArray.push(favoritesData);
			} else {
				console.log('No data available');
			}
		})
		.catch(error => {
			console.error(error);
		});

	return favoriteArray;
};

export default function Dashboard() {
	const [Tabs] = useState(['Indicators', 'MyContext']);
	const [TabsIndex, setSelectedIdx] = useState(0);

	const [CategoryIndex, setCategoryIndex] = useState(0);
	const { data: favorites, isSuccess } = useQuery({
		queryKey: [queryKey.favorite, 1],
		queryFn: async () => {
			const db = getDatabase(app);
			const favoriteDocRef = ref(db, `/user/favorite/${1}`);
			const snapshot = await get(favoriteDocRef);
			const favoriteArray: Favorite[] = [];

			if (snapshot.exists()) {
				snapshot.forEach(childSnapshot => {
					favoriteArray.push(childSnapshot.val());
				});
			}

			return favoriteArray;
		}
	});

	return (
		<div className={clsx(styles.Dashboard, roboto.variable, poppins.variable)}>
			<Menu Tabs={Tabs} SelectedIdx={TabsIndex} setSelectedIdx={setSelectedIdx} />

			{/* section 에 padding 을 주면 header 가 문제생겨서 padding 을 각 요소에 나눠줌 */}
			<section>
				<Dashheader Tabs={Tabs} TabsIndex={TabsIndex} />

				{Tabs[TabsIndex] === 'Indicators' && isSuccess ? (
					<Indicators favorites={favorites} CategoryIndex={CategoryIndex} setCategoryIndex={setCategoryIndex} />
				) : (
					<MyContext />
				)}
			</section>
		</div>
	);
}
