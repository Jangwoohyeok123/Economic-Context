import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { Store_Type } from '@/types/redux';
import LineChart from '@/components/charts/line/LineChart';
import { useRouter } from 'next/router';
import const_queryKey from '@/const/queryKey';
import { useSelector } from 'react-redux';
import { cleanString } from '@/utils/cleanString';
import { DateAndValue_Type, Indicator_Type } from '@/types/fred';
import ChartDescription from '@/components/chartDescription/ChartDescription';
import { frontUrl, poppins, roboto } from './_app';
import { useEffect, useState } from 'react';
import { getChartData, getIndicator } from '@/api/fred';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addFavorite, deleteFavorite, getFavoriteCateogry_List } from '@/api/favorite';
import { FavoriteIndicator_Type } from '@/types/favorite';
import SkeletonMorepage from '@/components/skeleton/SkeletonMorepage';
import styled from 'styled-components';
import Footer from '@/components/footer/Footer';
import AnotherIndicators from '@/components/anotherIndicators/AnotherIndicators';
import { changeCategoryIdToColor } from '@/utils/changeNameToCategoryId';
import getVolatility from '@/utils/getVolatility';

const DynamicAlertModal = dynamic(() => import('@/components/modals/loginAlertModal/LoginAlertModal'), { ssr: false });

const Main = styled.main`
	width: 80%;
	background: #fff;
	min-height: 100vh;
	padding-top: var(--headerSize);
`;

interface IntroduceContainer_Props {
	volatility: number;
}

const IntroduceContainer = styled.div<IntroduceContainer_Props>`
	border: 1px solid #111 0.5;
	position: relative;
	height: 150px;
	padding: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	> div {
		width: 80%;

		h1 {
			font-weight: 400;
			font-size: 1.4rem;
			width: 80%;
		}

		.values {
			span:nth-of-type(1) {
				font-size: 3rem;
				font-weight: 500;
				padding-right: 20px;
			}

			span:nth-of-type(2) {
				color: ${props => {
					const { volatility } = props;
					if (volatility > 0) return 'red';
					else if (volatility === 0) return '#111';
					else return 'blue';
				}};
			}
		}

		div:nth-of-type(2) {
			font-size: 0.85rem;
			opacity: 0.8;
		}
	}
`;

interface SaveFavoriteIndicatorButton_Props {
	isSavedIndicator?: boolean;
	isLogin: boolean;
}

const SaveFavoriteIndicatorButton = styled.button<SaveFavoriteIndicatorButton_Props>`
	width: 150px;
	height: 50px;
	background: ${props => {
		const { isSavedIndicator, isLogin } = props;
		if (!isLogin) return '#ccc';

		return isSavedIndicator ? '#111' : '#ccc';
	}};
	color: ${props => {
		const { isSavedIndicator, isLogin } = props;
		if (!isLogin) return '#111';

		return isSavedIndicator ? '#fff' : '#111';
	}};
	border: none;
	transition: 0.3s;

	&:hover {
		cursor: pointer;
	}
`;

export default function Morepage() {
	const router = useRouter();
	const user = useSelector((state: Store_Type) => state.user);
	const queryClient = useQueryClient();
	const { id: seriesId, title, categoryId } = router.query;
	const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
	const [chartDatas, setChartDatas] = useState<DateAndValue_Type[]>([]);
	const [isSavedIndicator, setIsSavedIndicator] = useState<boolean>(false);
	const [indicator, setIndicators] = useState<Indicator_Type>({
		id: '',
		realtime_start: '',
		realtime_end: '',
		title: '',
		notes: '',
		observation_start: '',
		observation_end: '',
		frequency: '',
		frequency_short: '',
		units: '',
		units_short: '',
		popularity: 0,
		seasonal_adjustment: '',
		seasonal_adjustment_short: '',
		group_popularity: 0,
		last_updated: ''
	});

	const { data: favoriteCateogry_List, isSuccess: isFavoriteCategoryExist } = useQuery({
		queryKey: [const_queryKey.favorite, categoryId],
		queryFn: () => getFavoriteCateogry_List(user.id, Number(categoryId))
	});

	const addFavoriteMutation = useMutation({
		mutationFn: ({ userId, seriesId }: { userId: number; seriesId: string }) => addFavorite(userId, seriesId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [const_queryKey.favorite]
			});
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
		},
		onError(error) {
			console.error(error);
		}
	});

	// 클릭하면 favorite 에 있다면 active 상태로서 delete, 없다면 add
	const buttonHandler = () => {
		if (!user.isLogin) {
			setIsAlertModalOpen(true);
			return;
		}

		const isFind = favoriteCateogry_List?.find((indicator: FavoriteIndicator_Type) => indicator.seriesId === seriesId);

		isFind
			? deleteFavoriteMutation.mutate({ userId: user.id, seriesId: seriesId as string })
			: addFavoriteMutation.mutate({ userId: user.id, seriesId: seriesId as string });
	};

	// 화면을 구성하는데 필요한 정보를 get 하는 useEffect
	useEffect(() => {
		if (seriesId) {
			getChartData(seriesId as string)
				.then(chartDatas => {
					const { dataArray } = chartDatas;
					setChartDatas(dataArray);
				})
				.catch(err => {
					console.error(err.message);
				});

			getIndicator(seriesId as string).then((indicator: Indicator_Type) => {
				const { id, title, notes, observation_start, observation_end, frequency, frequency_short, units, units_short, popularity } = indicator;

				setIndicators(prev => ({
					...prev,
					id,
					title: cleanString(title), // Indicator 카드 컴포넌트에게서 router.query 를 통해 전달받은 값입니다.
					notes: notes ?? '',
					observation_start,
					observation_end,
					frequency,
					frequency_short,
					units,
					units_short,
					popularity
				}));
			});
		}
	}, [router, seriesId]);

	// 현재 지표가 save 상태인지 확인하는 useEffect
	useEffect(() => {
		if (user.isLogin) {
			favoriteCateogry_List?.some((el: FavoriteIndicator_Type) => el.seriesId === seriesId) ? setIsSavedIndicator(true) : setIsSavedIndicator(false);
		}
	}, [favoriteCateogry_List, seriesId]);

	// 작업이 끝나고 처리할 것
	if (!indicator.id || !chartDatas.length) {
		return <SkeletonMorepage />;
	}

	const prevData = Number(chartDatas[chartDatas.length - 2].value);
	const lastData = Number(chartDatas[chartDatas.length - 1].value);

	const volatility = getVolatility(prevData, lastData);

	return (
		<>
			<Main className={clsx(poppins.variable, roboto.variable)}>
				{chartDatas.length && indicator && (
					<>
						<IntroduceContainer volatility={volatility}>
							<div>
								<h1>{indicator.title}</h1>
								<div className='values'>
									<span>{lastData}</span>
									<span>{volatility >= 0 ? `(+${volatility}%)` : `(${volatility}%)`}</span>
								</div>
								<div>last_updated: {indicator.observation_end}</div>
							</div>
							<SaveFavoriteIndicatorButton isLogin={user.isLogin} isSavedIndicator={isSavedIndicator} onClick={buttonHandler}>
								{user.isLogin ? (isSavedIndicator ? 'remove' : 'save') : 'save'}
							</SaveFavoriteIndicatorButton>
						</IntroduceContainer>

						<LineChart categoryId={Number(categoryId as string)} values={chartDatas} width={100}></LineChart>
						<ChartDescription indicator={indicator}></ChartDescription>
						<AnotherIndicators />
					</>
				)}
			</Main>
			<Footer />
			{/* <DynamicAlertModal
				isModalOpen={isAlertModalOpen}
				setIsModalOpen={setIsAlertModalOpen}
				size='small'
				header='You need to login!'
				body='Our service is required to login'
				leftButtonContent='Cancle'
				leftButtonHandler={() => setIsAlertModalOpen(false)}
				rightButtonContent='Login'
				rightButtonHandler={() => router.push(`${frontUrl}/login`)}
			/> */}
		</>
	);
}
