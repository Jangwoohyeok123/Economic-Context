import clsx from 'clsx';
import axios from 'axios';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styles from './Home.module.scss';
import { useRouter } from 'next/router';
import { roboto, poppins } from './_app';
import { login } from '@/actions/actions';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Category } from '@/types/fredInterface';
import { useDispatch, useSelector } from 'react-redux';
import IndicatorCard from '@/components/cards/indicatorCard/IndicatorCard';
import { changeNameToCategoryId, changeCategoryIdToName } from '@/utils/changeNameToCategoryId';
import { get, getDatabase, push, ref, remove, set } from 'firebase/database';
import app from '@/firebase/firebaseConfig';
import User from '@/types/userInterface';
import Store from '@/types/storeInterface';
import { addFavoriteIndicator, deleteFavoriteIndicator } from '@/firebase/logic';
import ChartModal from '@/components/modals/chartModal/ChartModal';

const DynamicAlertModal = dynamic(() => import('@/components/modals/alertModal/AlertModal'), { ssr: false });
const DynamicChartModal = dynamic(() => import('@/components/modals/chartModal/ChartModal'), { ssr: false });

const fetchCategory = async (categoryId: number) => {
	const res = await fetch(`/api/category?categoryId=${categoryId}`);
	const json = await res.json();

	return json.category.seriess;
};

export default function Pages({ interest }: { interest: Category }) {
	const router = useRouter();
	const db = getDatabase(app);
	const dispatch = useDispatch();
	const [categoryIndex, setCategoryIndex] = useState(0);
	const user = useSelector((state: Store) => state.user);
	const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
	const [isChartModalOpen, setIsChartModalOpen] = useState(false);

	const categoryNames = ['interest', 'exchange', 'production', 'consume'];
	const { data: category, isSuccess } = useQuery({
		queryKey: ['category', changeNameToCategoryId(categoryNames[categoryIndex])],
		queryFn: () => fetchCategory(changeNameToCategoryId(categoryNames[categoryIndex]))
	});

	// () => GotoAboutPage(seriesId)
	const GotoAboutPage = (seriesId: string) => {
		router.push(`/${seriesId}`);
	};

	const refreshCategory = (categoryName: string) => {
		setCategoryIndex(categoryNames.indexOf(categoryName));
	};

	useEffect(() => {
		const authCode = router.query.code;

		// async-await, try-catch 고려하기
		if (authCode) {
			axios
				.post('http://localhost:4000/auth/google', { code: authCode })
				.then(response => {
					const jwt = response.data[0];
					const userData = response.data[1];
					sessionStorage.setItem('token', jwt);
					dispatch(login(userData));
				})
				.catch(error => {
					console.error('Error:', error);
					// error handling => 로그인 페이지로 유도같은
				});
		}
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
						? category.map((series: { id: string; title: string }, idx: number) => {
								const seriesId = series.id;
								const title = series.title;

								return (
									<IndicatorCard
										key={idx}
										seriesId={seriesId}
										categoryId={changeNameToCategoryId(categoryNames[categoryIndex])}
										isChartModalOpen={isChartModalOpen}
										setIsChartModalOpen={setIsChartModalOpen}
										title={title}
										leftButtonContent='delete'
										leftButtonHandler={() => {
											deleteFavoriteIndicator(1, seriesId);
										}}
										rightButtonContent='save'
										rightButtonHandler={
											user.isLogin ? () => addFavoriteIndicator(114, seriesId, title) : () => setIsAlertModalOpen(true)
										}
										pageType='main'
									/>
								);
						  })
						: null}
				</figure>
			</main>
			<DynamicAlertModal
				isModalOpen={isAlertModalOpen}
				setIsModalOpen={setIsAlertModalOpen}
				size='small'
				header='You need to login!'
				body='Our service is required to login'
				leftButtonContent='Cancle'
				leftButtonHandler={() => setIsAlertModalOpen(false)}
				rightButtonContent='Login'
				rightButtonHandler={() => (window.location.href = 'http://localhost:3000/login')}
			/>
			<ChartModal isChartModalOpen={isChartModalOpen} setIsChartModalOpen={setIsChartModalOpen}></ChartModal>
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
