import clsx from 'clsx';
import styles from './Home.module.scss';
import { Poppins, Roboto } from 'next/font/google';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import IndicatorCard from '@/components/cards/indicatorCard/IndicatorCard';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { SavedCardSet } from '@/types/dbInterface';
import { Seriess, Category } from '@/types/fredInterface';
import { addCard } from '@/actions/actions';

const AlertModalDynamic = dynamic(() => import('@/components/modals/alertModal/AlertModal'), { ssr: false });

// 전역 글꼴임
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

// 함수를 선언할 때 뭐가 들어갈지 정확히 정의할 때 타입스크립트를 사용한다.
// { Interest: {}, Exchange: {}, Consume: {}, Production: {}} 꼴로 전달받음
export default function Pages({
	interest,
	exchange,
	consume,
	production
}: {
	interest: Category;
	exchange: Category;
	consume: Category;
	production: Category;
}) {
	const router = useRouter();
	const categoryNames = Object.keys(arguments[0]);
	const [Categorys] = useState(Object.values(arguments[0]));
	const [CategoryIndex, setCategoryIndex] = useState(0);
	const savedCardSet = useSelector(state => state.savedCardSet);
	const dispatch = useDispatch();

	const [IsAlertModalOpen, setIsAlertModalOpen] = useState(false);
	const isLogin = useSelector(state => state.user.isLogin);

	const GotoAboutPage = (seriesId: string) => {
		router.push(`/${seriesId}`);
	};

	const saveCardToDB = (categoryName: string, seriesId: string, title: string) => {
		// 중복방지
		if (savedCardSet[categoryName].find(obj => obj.seriesId === seriesId)) return;
		dispatch(addCard(categoryName, seriesId, title));
	};

	const deleteCardInDB = () => {};

	useEffect(() => {
		// URL 쿼리에서 'code' 파라미터를 추출
		const authCode = router.query.code;

		if (authCode) {
			// 1. 인가코드 전달
			try {
				fetch('http://localhost:3000/api/auth', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ code: authCode })
				})
					.then(response => response.json())
					.then(data => {
						// console.log('Success:', data);
						// 여기에 성공 시의 추가 로직을 구현할 수 있습니다.
					})
					.catch(error => {
						console.error('Error:', error);
					});
			} catch (error) {
				console.error('Fetch error:', error);
			}

			window.location.href = 'http://localhost:3000';
		}
	}, [router.query]);

	return (
		<>
			<main className={clsx(styles.Home, poppins.variable, roboto.variable)}>
				<div className={clsx(styles.mainImage)}>
					<Image src='/mainImage.jpg' alt='mainImage' layout='fill' objectFit='cover' />
				</div>
				<div className={clsx(styles.tab)}>
					{Categorys.map((el, idx) => {
						return (
							<button key={idx} onClick={() => setCategoryIndex(idx)}>
								{categoryNames[idx]}
							</button>
						);
					})}
				</div>
				<figure className={clsx(styles.category)}>
					{Categorys[CategoryIndex]?.seriess.map((series, idx: number) => {
						const seriesId = series.id;
						const title = series.title;
						return (
							<IndicatorCard
								key={idx}
								title={title}
								leftButtonContent={'more'}
								leftButtonHandler={() => GotoAboutPage(seriesId)}
								rightButtonContent={'save'}
								rightButtonHandler={
									isLogin
										? () => saveCardToDB(categoryNames[CategoryIndex], seriesId, title, idx)
										: () => setIsAlertModalOpen(true)
								}
								pageType={'main'}
							/>
						);
					})}
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

	const fetchExchangeCategory = await fetch(
		`${baseUrl}category/series?category_id=94&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
	);
	const exchange = await fetchExchangeCategory.json();

	const fetchConsumeCategory = await fetch(
		`${baseUrl}category/series?category_id=9&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
	);
	const consume = await fetchConsumeCategory.json();

	const fetchProductionCategory = await fetch(
		`${baseUrl}category/series?category_id=31&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
	);
	const production = await fetchProductionCategory.json();

	return {
		// 4개를 한 번에 호출해야하는지 고민해볼 것
		// prefetching? hover 시 fetcing 이 일어나는 기능이 있음
		// a fethcing 하고 bcd 는 prefetcging 이용할 수 있음 promise.all 과 고민해볼 것
		// props 는 json'Category이름' 꼴로 전송해야한다. 화면에 json 이후 글자가 표기되기 때문이다.
		props: {
			interest,
			exchange,
			consume,
			production
		}
	};
}
