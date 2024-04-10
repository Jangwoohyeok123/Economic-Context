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

const DynamicAlertModal = dynamic(() => import('@/components/modals/alertModal/AlertModal'), { ssr: false });

const Main = styled.main`
	width: 80%;
	background: #fff;
	min-height: 100vh;
	padding-top: var(--headerSize);
`;

const Introduce = styled.aside`
	border: 1px solid #111 0.5;
	position: relative;
	height: 120px;

	h1 {
		font-weight: 500;
		font-size: 1.3rem;
		width: 80%;
	}
`;

interface Button_Props {
	isLogin: boolean;
}

const Button = styled.button<Button_Props>`
	background: ${props => (props.isLogin ? '#111' : '#fff')};
`;

export default function Morepage() {
	const router = useRouter();
	const user = useSelector((state: Store_Type) => state.user);
	const queryClient = useQueryClient();
	const { id: seriesId, title, categoryId } = router.query;
	const [isActive, setIsActive] = useState(false);
	const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
	const [chartDatas, setChartDatas] = useState<DateAndValue_Type[]>([]);
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

	// 클릭하면 favorite 에 있다면 active 상태로서 delete, 없다면 add
	const buttonHandler = () => {
		if (!user.isLogin) {
			setIsAlertModalOpen(true);
			return;
		}

		const isFind = favoriteCateogry_List?.find((indicator: FavoriteIndicator_Type) => indicator.seriesId === seriesId);

		if (isFind) {
			deleteFavoriteMutation.mutate({ userId: user.id, seriesId: seriesId as string });
			setIsActive(!isActive);
		} else {
			addFavoriteMutation.mutate({ userId: user.id, seriesId: seriesId as string });
			setIsActive(!isActive);
		}
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
				const {
					id,
					title,
					notes,
					observation_start,
					observation_end,
					frequency,
					frequency_short,
					units,
					units_short,
					popularity
				} = indicator;

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

	// save, delete 상황을 확인하는 useEffect
	useEffect(() => {
		if (favoriteCateogry_List?.some((el: FavoriteIndicator_Type) => el.seriesId === seriesId)) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [favoriteCateogry_List, seriesId]);

	// 작업이 끝나고 처리할 것
	if (!indicator.id || !chartDatas.length) {
		return <SkeletonMorepage />;
	}

	// 정수로 만든 후 다시 소수로 만드는 과정
	function roundTo(num: number, decimalPlaces: number) {
		const factor = 10 ** decimalPlaces;
		return Math.round(num * factor) / factor;
	}

	const prevData = Number(chartDatas[chartDatas.length - 2].value);
	const lastData = Number(chartDatas[chartDatas.length - 1].value);

	const result = roundTo(lastData - prevData, 2);

	return (
		<>
			<Main className={clsx(poppins.variable, roboto.variable)}>
				{chartDatas.length && indicator && (
					<>
						<Introduce>
							<h1>제목:{indicator.title}</h1>
							<span>최종데이터: {lastData}</span>
							<span>변화율: {result}%</span>
							<div>최종 측정일: {indicator.observation_end}</div>
						</Introduce>
						<LineChart duration={1} indicator={indicator} values={chartDatas} width={100}>
							<Button isLogin={user.isLogin} onClick={buttonHandler}>
								{user.isLogin ? 'delete' : 'save'}
							</Button>
						</LineChart>
						<ChartDescription indicator={indicator}></ChartDescription>
					</>
				)}
			</Main>
			<DynamicAlertModal
				isModalOpen={isAlertModalOpen}
				setIsModalOpen={setIsAlertModalOpen}
				size='small'
				header='You need to login!'
				body='Our service is required to login'
				leftButtonContent='Cancle'
				leftButtonHandler={() => setIsAlertModalOpen(false)}
				rightButtonContent='Login'
				rightButtonHandler={() => router.push(`${frontUrl}/login`)}
			/>
		</>
	);
}
