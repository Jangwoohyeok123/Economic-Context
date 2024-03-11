import clsx from 'clsx';
import Image from 'next/image';
import axios from 'axios';
import styles from './Home.module.scss';
import dynamic from 'next/dynamic';
import { Store } from '@/types/redux';
import { login } from '@/actions/actions';
import IndicatorCard from '@/components/cards/indicatorCard/IndicatorCard';
import { useRouter } from 'next/router';
import const_queryKey from '@/const/queryKey';
import { roboto, poppins } from './_app';
import { useEffect, useState } from 'react';
import { changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import { useDispatch, useSelector } from 'react-redux';
import User, { Indicator, IndicatorWithIsActive } from '@/types/userInterface';
import { Category, Seriess, SeriessWithIsActive } from '@/types/fredInterface';
import { getIndicator, getIndicators, getChartData } from '@/backendApi/fred';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addFavorite, deleteFavorite, getFavorite, getFavorites } from '@/backendApi/user';

const DynamicAlertModal = dynamic(() => import('@/components/modals/alertModal/AlertModal'), { ssr: false });
const DynamicChartModal = dynamic(() => import('@/components/modals/chartModal/ChartModal'), { ssr: false });

/* 
	fetching 순서 == enhancedCategory useEffect 과정
	초기
	1. category 데이터를 fred 에서 갖고온다. 
	2. category 데이터에 isActive false 를 부여한다.
	3. favorites 를 back 에서 갖고온다.
	4. category 데이터 중 favorites 데이터와 일치하는 데이터는 isActive on 을 부여한다.

	button 은 enhancedCategory 를 처리한다.
	클릭하면 enhancedCategory 에서 isActive 를 toggle 한다.
	클릭하면 modify 함수를 호출하여 isActive 가 false 면 save 한다.
	클릭하면 modify 함수를 호출하여 isActive 가 true 면 delete 한다.
*/

export default function Pages({ interest }: { interest: Category }) {
	const user = useSelector((state: Store) => state.user);
	const router = useRouter();
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const categoryNames = ['interest', 'exchange', 'production', 'consume'];
	const [categoryIndex, setCategoryIndex] = useState(0);
	const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
	const [isChartModalOpen, setIsChartModalOpen] = useState(false);
	const [enhancedCategoryWithIsActive, setEnhancedCategoryWithActive] = useState<SeriessWithIsActive[]>([]);
	const { data: category, isSuccess: isCategoryExist } = useQuery({
		queryKey: [const_queryKey.category, changeNameToCategoryId(categoryNames[categoryIndex])],
		queryFn: () => getIndicators(changeNameToCategoryId(categoryNames[categoryIndex])),
		initialData: interest.seriess
	});

	// useQuery
	const { data: favorite, isSuccess: isFavoriteExist } = useQuery({
		queryKey: [const_queryKey.favorite, user.id],
		queryFn: () => getFavorite(user.id, changeNameToCategoryId(categoryNames[categoryIndex]))
	});

	// useMutaition: favorite 을 위한 add, delete
	const addFavoriteMutation = useMutation({
		mutationFn: ({ userId, seriesId }: { userId: number; seriesId: string }) => addFavorite(userId, seriesId),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: [const_queryKey.favorite, user.id] });
			alert('add 성공');
		},
		onError(error) {
			console.error(error);
		}
	});

	const deleteFavoriteMutation = useMutation({
		mutationFn: ({ userId, seriesId }: { userId: number; seriesId: string }) => deleteFavorite(userId, seriesId),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: [const_queryKey.favorite, user.id] });
			alert('delete 성공');
		},
		onError(error) {
			console.error(error);
		}
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

	const buttonToggle = (userId: number, isActive: boolean, seriesId: string) => {
		if (isActive) {
			deleteFavoriteMutation.mutate({ userId: userId, seriesId: seriesId });
		} else {
			addFavoriteMutation.mutate({ userId: userId, seriesId: seriesId });
		}
	};

	useEffect(() => {
		const authCode = router.query.code;
		if (authCode) setJwtAndUserData(authCode as string);
	}, [router.query]);

	useEffect(() => {
		if (isCategoryExist && category && isFavoriteExist && favorite) {
			const categoryWithIsActive = category.map((item: Seriess) => ({
				...item,
				isActive: false
			}));

			favorite.forEach((favoriteIndicator: IndicatorWithIsActive) => {
				categoryWithIsActive.forEach((categoryIndicator: SeriessWithIsActive) => {
					if (favoriteIndicator.seriesId === categoryIndicator.id) categoryIndicator.isActive = true;
				});
			});

			setEnhancedCategoryWithActive(categoryWithIsActive);
		}
	}, [category, isCategoryExist, isFavoriteExist, favorite]);

	return (
		<>
			<main className={clsx(styles.Home, poppins.variable, roboto.variable)}>
				<div className={clsx(styles.mainImage)}>
					<Image src='/mainImage.jpg' alt='mainImage' layout='fill' objectFit='cover' />
				</div>
				<div className={clsx(styles.categoryNames)}>
					{categoryNames.map((_, idx) => {
						return (
							<button
								className={clsx(categoryIndex === idx ? styles.on : '')}
								key={idx}
								onClick={() => setCategoryIndex(idx)}>
								{categoryNames[idx]}
							</button>
						);
					})}
				</div>
				<figure className={clsx(styles.category)}>
					{user.isLogin
						? enhancedCategoryWithIsActive.map((series: SeriessWithIsActive, idx: number) => {
								let notes;
								const title = series.title;
								const seriesId = series.id;
								const frequecy = series.frequency;
								const popularity = series.popularity;
								const observation_start = series.observation_start;
								const observation_end = series.observation_end;
								const isActive = series.isActive;
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
										<button
											className={clsx(isActive ? styles.on : '')}
											onClick={() => {
												buttonToggle(user.id, isActive, seriesId);
												setEnhancedCategoryWithActive(prevArray => {
													return prevArray.map((item, mapIndex) => {
														return mapIndex === idx ? { ...item, isActive: !item.isActive } : item;
													});
												});
											}}>
											save
										</button>
									</IndicatorCard>
								);
						  })
						: category.map((series: Seriess, idx: number) => {
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
										<button onClick={() => setIsAlertModalOpen(true)}>save</button>
									</IndicatorCard>
								);
						  })}
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
			<DynamicChartModal isChartModalOpen={isChartModalOpen} setIsChartModalOpen={setIsChartModalOpen} />
		</>
	);
}

// 초기 애플리케이션 실행시에만 서버사이드 렌더링을 진행
export async function getServerSideProps() {
	const baseUrl = 'https://api.stlouisfed.org/fred/';
	const fetchInterestCategory = await fetch(
		`${baseUrl}category/series?category_id=114&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
	);
	const interest = await fetchInterestCategory.json();

	return {
		props: {
			interest
		}
	};
}
