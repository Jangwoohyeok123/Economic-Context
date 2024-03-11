import clsx from 'clsx';
import User from '@/types/userInterface';
import Image from 'next/image';
import axios from 'axios';
import styles from './Home.module.scss';
import dynamic from 'next/dynamic';
import { Store } from '@/types/redux';
import { login } from '@/actions/actions';
import { useQuery } from '@tanstack/react-query';
import IndicatorCard from '@/components/cards/indicatorCard/IndicatorCard';
import { useRouter } from 'next/router';
import const_queryKey from '@/const/queryKey';
import { roboto, poppins } from './_app';
import { Category, Seriess } from '@/types/fredInterface';
import { useEffect, useRef, useState } from 'react';
import { changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import { useDispatch, useSelector } from 'react-redux';
import { getIndicator, getIndicators, getChartData } from '@/backendApi/fred';
import const_categoryTypes from '@/const/categoryId';
import const_categoryColor from '@/const/categoryColor';

const DynamicAlertModal = dynamic(() => import('@/components/modals/alertModal/AlertModal'), { ssr: false });
const DynamicChartModal = dynamic(() => import('@/components/modals/chartModal/ChartModal'), { ssr: false });

export default function Pages({ interest }: { interest: Category }) {
	const user = useSelector((state: Store) => state.user);
	const router = useRouter();
	const dispatch = useDispatch();
	// const refCategoryButtons = useRef<HTMLButtonElement>([]);
	const categoryNames = ['interest', 'exchange', 'production', 'consume'];
	const [categoryIndex, setCategoryIndex] = useState(0);
	const [IsAlertModalOpen, setIsAlertModalOpen] = useState(false);
	const [isChartModalOpen, setIsChartModalOpen] = useState(false);
	const { data: category, isSuccess } = useQuery({
		queryKey: [const_queryKey.category, changeNameToCategoryId(categoryNames[categoryIndex])],
		queryFn: () => getIndicators(changeNameToCategoryId(categoryNames[categoryIndex]))
	});

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

	// const categoryTabHover = (categoryId: number, idx: number) => {
	// 	let backgroundColor: string = const_categoryColor.interest;
	// 	if (categoryId === const_categoryTypes.interest) backgroundColor = const_categoryColor.interest;
	// 	else if (categoryId === const_categoryTypes.exchange) backgroundColor = const_categoryColor.exchange;
	// 	else if (categoryId === const_categoryTypes.production) backgroundColor = const_categoryColor.production;
	// 	else if (categoryId === const_categoryTypes.consume) backgroundColor = const_categoryColor.consume;

	// 	const mouseEnter = () => {
	// 		if (refCategoryButtons.current[idx]) {
	// 			refCategoryButtons.current[idx].style.backgroundColor = backgroundColor;
	// 		}
	// 	};
	// 	const mouseLeave = () => {
	// 		if (refCategoryButtons.current[idx]) {
	// 			refCategoryButtons.current[idx].style.backgroundColor = '#efefef';
	// 		}
	// 	};

	// 	return { mouseEnter, mouseLeave };
	// };

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

				<div className={clsx(styles.categoryNames)}>
					{categoryNames.map((categoryName, idx) => {
						// const { mouseEnter, mouseLeave } = categoryTabHover(changeNameToCategoryId(categoryName), idx);
						return (
							<button
								// ref={el => (refCategoryButtons.current[idx] = el)}
								key={idx}
								onClick={() => setCategoryIndex(idx)}
								// onMouseEnter={mouseEnter}
								// onMouseLeave={mouseLeave}
							>
								{categoryNames[idx]}
							</button>
						);
					})}
				</div>
				<figure className={clsx(styles.category)}>
					{isSuccess
						? category.map((series: Seriess, idx: number) => {
								let notes;
								const title = series.title;
								const seriesId = series.id;
								const frequecy = series.frequency;
								const popularity = series.popularity;
								const observation_start = series.observation_start;
								const observation_end = series.observation_end;
								if (series.notes) notes = series.notes;

								return (
									<IndicatorCard
										key={idx}
										title={title}
										seriesId={seriesId}
										categoryId={changeNameToCategoryId(categoryNames[categoryIndex])}
										frequency={frequecy}
										popularity={popularity}
										notes={notes ? notes : ''}
										observation_end={observation_end}
										observation_start={observation_start}
										className={styles.IndicatorCard}>
										<div>
											{notes ? (
												<p>{notes}</p>
											) : (
												<p>This indicator does not have information about the indicator description.</p>
											)}
										</div>
										<button>save</button>
									</IndicatorCard>
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
export async function getServerSideProps() {
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
