import clsx from 'clsx';
import styles from './Home.module.scss';
import { Poppins, Roboto } from 'next/font/google';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import IndicatorCard from '@/components/cards/indicatorCard/IndicatorCard';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { Category } from '@/types/fredInterface';
import axios from 'axios';
import { login } from '@/actions/actions';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import changeNameToCategoryId from '@/utils/changeNameToCategoryId';

const AlertModalDynamic = dynamic(() => import('@/components/modals/alertModal/AlertModal'), { ssr: false });

export const roboto = Roboto({
	subsets: ['latin'],
	weight: ['300', '400', '500'],
	variable: '--baseFont'
});
export const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500'],
	variable: '--pointFont'
});

const fetchCategory = async (categoryId: string) => {
	const res = await fetch(`/api/category?categoryId=${categoryId}`);
	const json = await res.json();

	console.log('fetchCategory 데이터');
	console.log(json.category.seriess);
	console.log('fetchCategory 데이터');
	return json.category.seriess;
};

export default function Pages({ interest }: { interest: Category }) {
	const router = useRouter();
	const categoryNames = ['interest', 'exchange', 'production', 'consume'];
	const [CategoryIndex, setCategoryIndex] = useState(0);
	const { data: Category, isSuccess } = useQuery({
		queryKey: ['category', categoryNames[CategoryIndex]],
		queryFn: () => fetchCategory(changeNameToCategoryId(categoryNames[CategoryIndex]))
	});

	const dispatch = useDispatch();

	const [IsAlertModalOpen, setIsAlertModalOpen] = useState(false);
	const User = useSelector(state => state.user);

	const GotoAboutPage = (seriesId: string) => {
		router.push(`/${seriesId}`);
	};

	const saveCardToDB = (categoryName: string, seriesId: string, title: string) => {
		// userId 갖고오기
		if (User.isLogin) {
			const userId = User.userData.id;
			axios.post(`http://localhost:4000/user/favorite/add/${userId}`, {
				indicatorId: seriesId
			});
		} else {
			console.error('data Save 실패');
		}
	};

	const deleteCardInDB = (seriesId: string): void => {
		if (User.isLogin) {
			const userId = User.userData.id;
			axios.post(`http://localhost:4000/user/favorite/delete/${userId}`, {
				indicatorId: seriesId
			});
		} else {
			console.error('data delete 실패');
		}
	};

	const refreshCategory = categoryName => {
		setCategoryIndex(categoryNames.indexOf(categoryName));
	};

	useEffect(() => {
		const authCode = router.query.code;

		if (authCode) {
			try {
				axios
					.post(
						'http://localhost:4000/auth/google',
						{ code: authCode },
						{
							headers: {
								'Content-Type': 'application/json'
							}
						}
					)
					.then(response => {
						const jwt = response.data[0];
						const userData = response.data[1];
						sessionStorage.setItem('token', jwt);
						dispatch(login(userData));
					})
					.catch(error => {
						// 이 부분에서 에러가 발생한다.
						console.error('Error:', error);
					});
			} catch (error) {
				console.error('Fetch error', error);
			}
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
				{/* <article className={clsx(styles.category)}>{}</article> */}
				<figure className={clsx(styles.category)}>
					{isSuccess ? (
						Category.map((series, idx: number) => {
							const seriesId = series.id;
							const title = series.title;
							if (idx === 1) console.log(Category);

							return (
								<IndicatorCard
									key={idx}
									title={title}
									leftButtonContent={'more'}
									leftButtonHandler={() => GotoAboutPage(seriesId)}
									rightButtonContent={'save'}
									rightButtonHandler={
										User.isLogin ? () => saveCardToDB('114', seriesId, title) : () => setIsAlertModalOpen(true)
									}
									pageType={'main'}
								/>
							);
						})
					) : (
						<></>
					)}
				</figure>
			</main>
			{/* save 버튼에서 사용한다. */}
			<AlertModalDynamic
				isModalOpen={IsAlertModalOpen}
				setIsModalOpen={setIsAlertModalOpen}
				size={'small'}
				header={'You need to login!'}
				body={'Our service is required to login'}
				leftButtonContent={'Cancle'}
				leftButtonHandler={() => setIsAlertModalOpen(false)}
				rightButtonContent={'Login'}
				rightButtonHandler={() => (window.location.href = 'http://localhost:3000/login')}
			/>
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
