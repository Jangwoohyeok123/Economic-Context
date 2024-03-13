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
import { getIndicators } from '@/backendApi/fred';
import { roboto, poppins } from './_app';
import { useEffect, useState } from 'react';
import { changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import { useDispatch, useSelector } from 'react-redux';
import User, { IndicatorWithIsActive } from '@/types/userInterface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Category, Seriess, SeriessWithIsActive } from '@/types/fredInterface';
import { addFavorite, deleteFavorite, getFavorite } from '@/backendApi/user';
import ReactPaginate from 'react-paginate';
import Footer from '@/components/footer/Footer';

/* 
	실행부분은 한눈에 보이게 선언부분은 복잡함을 담당하기 => 이 때 쪼개기를 잘 활용할 것
*/

const DynamicAlertModal = dynamic(() => import('@/components/modals/alertModal/AlertModal'), { ssr: false });
const DynamicChartModal = dynamic(() => import('@/components/modals/chartModal/ChartModal'), { ssr: false });

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
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 9;

	const { data: category, isSuccess: isCategoryExist } = useQuery({
		queryKey: [const_queryKey.category, changeNameToCategoryId(categoryNames[categoryIndex])],
		queryFn: () => getIndicators(changeNameToCategoryId(categoryNames[categoryIndex]))
	});

	// useQuery
	const { data: favorite, isSuccess: isFavoriteExist } = useQuery({
		queryKey: [const_queryKey.favorite, changeNameToCategoryId(categoryNames[categoryIndex])],
		queryFn: () => getFavorite(user.id, changeNameToCategoryId(categoryNames[categoryIndex]))
	});

	// useMutaition: favorite 을 위한 add, delete
	const addFavoriteMutation = useMutation({
		mutationFn: ({ userId, seriesId }: { userId: number; seriesId: string }) => addFavorite(userId, seriesId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [const_queryKey.favorite]
			});

			alert('add 성공');
		},
		onError(error) {
			console.error(error);
		}
	});

	const deleteFavoriteMutation = useMutation({
		mutationFn: ({ userId, seriesId }: { userId: number; seriesId: string }) => deleteFavorite(userId, seriesId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [const_queryKey.favorite]
			});
			alert('delete 성공');
		},
		onError(error) {
			console.error(error);
		}
	});

	// login 로직을 줄여보기
	const setJwtAndUserData = (authCode: string) => {
		if (authCode) {
			axios
				.post('http://localhost:4000/auth/google', { code: authCode })
				.then(response => {
					const jwt = response.data[0];
					const userData: User = response.data[1];
					sessionStorage.setItem('token', jwt);
					dispatch(login(userData));
				})
				.catch(error => {
					console.error('Error:', error);
				});
		}
	};

	const saveButtonToggle = (userId: number, isActive: boolean, seriesId: string) => {
		if (isActive) {
			deleteFavoriteMutation.mutate({ userId, seriesId });
		} else {
			addFavoriteMutation.mutate({ userId, seriesId });
		}
	};

	useEffect(() => {
		const authCode = router.query.code;
		if (authCode) setJwtAndUserData(authCode as string);
	}, []);

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
	}, [category, currentPage, favorite]);

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
								onClick={() => {
									setCategoryIndex(idx);
									setCurrentPage(0);
								}}>
								{categoryNames[idx]}
							</button>
						);
					})}
				</div>
				<figure className={clsx(styles.category)}>
					{user.isLogin
						? enhancedCategoryWithIsActive
								.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
								.map((series: SeriessWithIsActive, idx: number) => {
									const {
										title,
										id: seriesId,
										frequency,
										popularity,
										observation_start,
										observation_end,
										isActive
									} = series;
									const notes = series.notes ?? '';
									return (
										<IndicatorCard
											key={idx}
											title={title}
											seriesId={seriesId}
											categoryId={changeNameToCategoryId(categoryNames[categoryIndex])}
											frequency={frequency}
											popularity={popularity}
											notes={notes}
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
													saveButtonToggle(user.id, isActive, seriesId);
													setEnhancedCategoryWithActive(prevArray => {
														return prevArray.map((item, mapIndex) => {
															return mapIndex === idx ? { ...item, isActive: !item.isActive } : item;
														});
													});
												}}>
												{isActive ? 'remove' : 'save'}
											</button>
										</IndicatorCard>
									);
								})
						: category &&
						  category
								.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
								.map((series: Seriess, idx: number) => {
									const { title, id: seriesId, frequency, popularity, observation_start, observation_end } = series;
									const notes = series.notes ?? '';

									return (
										<IndicatorCard
											key={idx}
											title={title}
											seriesId={seriesId}
											categoryId={changeNameToCategoryId(categoryNames[categoryIndex])}
											frequency={frequency}
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
				{category && (
					<ReactPaginate
						pageCount={Math.ceil(category.length / itemsPerPage)}
						previousAriaLabel='이전'
						previousLabel='Prev'
						pageRangeDisplayed={5}
						marginPagesDisplayed={0}
						onPageChange={event => setCurrentPage(event.selected)}
						containerClassName={styles.pagination}
						breakLabel={null}
						forcePage={currentPage}
						activeClassName={styles.paginationActive}
						previousClassName={currentPage === 0 ? styles.disabled : ''}
						nextClassName={currentPage === Math.ceil(category.length / itemsPerPage) ? styles.disabled : ''}
						disabledClassName={styles.disabled}
					/>
				)}
			</main>
			<Footer />
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
