import clsx from 'clsx';
import Image from 'next/image';
import axios from 'axios';
import styles from './Home.module.scss';
import dynamic from 'next/dynamic';
import { Store } from '@/types/redux';
import { login } from '@/actions/actions';
import { useQuery } from '@tanstack/react-query';
import IndicatorCard from '@/components/cards/indicatorCard/IndicatorCard';
import { useRouter } from 'next/router';
import { roboto, poppins } from './_app';
import { changeNameToType } from '@/utils/changeNameToCategoryId';
import { Category, Seriess } from '@/types/fredInterface';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import const_queryKey from '@/const/queryKey';
import User from '@/types/userInterface';

const DynamicAlertModal = dynamic(() => import('@/components/modals/alertModal/AlertModal'), { ssr: false });
const DynamicChartModal = dynamic(() => import('@/components/modals/chartModal/ChartModal'), { ssr: false });

const fetchCategory = async (categoryId: number) => {
	const res = await fetch(`/api/category?categoryId=${categoryId}`);
	const json = await res.json();

	return json.category.seriess;
};

export default function Pages({ interest }: { interest: Category }) {
	const User = useSelector((state: Store) => state.user);
	const router = useRouter();
	const dispatch = useDispatch();
	const categoryNames = ['interest', 'exchange', 'production', 'consume'];
	const [categoryIndex, setCategoryIndex] = useState(0);
	const [IsAlertModalOpen, setIsAlertModalOpen] = useState(false);
	const [isChartModalOpen, setIsChartModalOpen] = useState(false);
	const { data: category, isSuccess } = useQuery({
		queryKey: [const_queryKey.category, changeNameToType(categoryNames[categoryIndex])],
		queryFn: () => fetchCategory(changeNameToType(categoryNames[categoryIndex]))
	});

	const GotoAboutPage = (seriesId: string) => {
		router.push(`/${seriesId}`);
	};

	const saveCardToDB = (categoryName: string, seriesId: string, title: string) => {
		if (User.isLogin) {
			const userId = User.id;
			axios.get(`http://localhost:4000/user/favorite/${userId}`).then(response => console.log(response));
		} else {
			console.error('data Save 실패');
		}
	};

	const refreshCategory = (categoryName: string) => {
		setCategoryIndex(categoryNames.indexOf(categoryName));
	};

	const setJwtAndUserData = (authCode: string) => {
		if (authCode) {
			axios
				.post('http://localhost:4000/auth/google', { code: authCode })
				.then(response => {
					const jwt = response.data[0];
					const userData: User = response.data[1];
					sessionStorage.setItem('token', jwt);
					dispatch(login(userData));
					router.push({
						query: {}
					});
				})
				.catch(error => {
					console.error('Error:', error);
				});
		}
	};

	useEffect(() => {
		const authCode = router.query.code;
		if (authCode) setJwtAndUserData(authCode as string);
	}, [router.query]);

	return (
		<>
			<main className={clsx(styles.Home, poppins.variable, roboto.variable)}>
				<div className={clsx(styles.mainImage)}>
					<Image src='/mainImage.jpg' alt='mainImage' layout='fill' objectFit='cover' />
				</div>

				<div className={clsx(styles.tab)}>
					{categoryNames.map((el, idx) => {
						return (
							<button key={idx} onClick={() => refreshCategory(categoryNames[idx])}>
								{categoryNames[idx]}
							</button>
						);
					})}
				</div>
				<figure className={clsx(styles.category)}>
					{isSuccess
						? category.map((series: Seriess, idx: number) => {
								const seriesId = series.id;
								const title = series.title;

								return (
									<IndicatorCard
										key={idx}
										title={title}
										leftButtonContent='more'
										leftButtonHandler={() => GotoAboutPage(seriesId)}
										rightButtonContent='save'
										rightButtonHandler={
											User.isLogin ? () => saveCardToDB('114', seriesId, title) : () => setIsAlertModalOpen(true)
										}
										pageType='main'
									/>
								);
						  })
						: null}
				</figure>
			</main>
			<DynamicAlertModal
				isModalOpen={IsAlertModalOpen}
				setIsModalOpen={setIsAlertModalOpen}
				size='small'
				header='You need to login!'
				body='Our service is required to login'
				leftButtonContent='Cancle'
				leftButtonHandler={() => setIsAlertModalOpen(false)}
				rightButtonContent='Login'
				rightButtonHandler={() => (window.location.href = 'http://localhost:3000/login')}
			/>
			<DynamicChartModal isChartModalOpen={isChartModalOpen} setIsChartModalOpen={setIsChartModalOpen} />
		</>
	);
}

// server 쪽에서 popularity 기준으로 sort 를 진행하고 전달하고 싶은데 ...
// promise.all 적용실패
export async function getStaticProps() {
	const baseUrl = 'https://api.stlouisfed.org/fred/';
	const fetchInterestCategory = await fetch(
		`${baseUrl}category/series?category_id=114&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
	);
	const interest = await fetchInterestCategory.json();

	// const fetchExchangeCategory = await fetch(
	// 	`${baseUrl}category/series?category_id=94&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
	// );
	// const exchange = await fetchExchangeCategory.json();

	// const fetchConsumeCategory = await fetch(
	// 	`${baseUrl}category/series?category_id=9&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
	// );
	// const consume = await fetchConsumeCategory.json();

	// const fetchProductionCategory = await fetch(
	// 	`${baseUrl}category/series?category_id=31&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
	// );
	// const production = await fetchProductionCategory.json();

	return {
		// 4개를 한 번에 호출해야하는지 고민해볼 것
		// prefetching? hover 시 fetcing 이 일어나는 기능이 있음
		// a fethcing 하고 bcd 는 prefetcging 이용할 수 있음 promise.all 과 고민해볼 것
		// props 는 json'Category이름' 꼴로 전송해야한다. 화면에 json 이후 글자가 표기되기 때문이다.
		props: {
			interest
			// exchange,
			// consume,
			// production
		}
	};
}
