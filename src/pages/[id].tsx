import clsx from 'clsx';
import styles from './Morepage.module.scss';
import dynamic from 'next/dynamic';
import { Store } from '@/types/reduxType';
import LineChart from '@/components/charts/line/LineChart';
import { Indicator } from '@/types/userType';
import { useRouter } from 'next/router';
import const_queryKey from '@/const/queryKey';
import { useSelector } from 'react-redux';
import { cleanString } from '@/utils/cleanString';
import { SeriessType } from '@/types/fredType';
import ChartDescription from '@/components/chartDescription/ChartDescription';
import { frontUrl, poppins, roboto } from './_app';
import { useEffect, useState } from 'react';
import { getChartData, getIndicator } from '@/api/fred';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addFavorite, deleteFavorite, getFavorite } from '@/api/backend';
import BubblePopButton from '@/components/bubblePopButton/BubblePopButton';

const DynamicAlertModal = dynamic(() => import('@/components/modals/alertModal/AlertModal'), { ssr: false });

interface DataItem {
	date: Date;
	value: number;
}

export default function Morepage() {
	const router = useRouter();
	const user = useSelector((state: Store) => state.user);
	const queryClient = useQueryClient();
	const { id: seriesId, title, categoryId } = router.query;
	const [isActive, setIsActive] = useState(false);
	const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
	const [chartDatas, setChartDatas] = useState<DataItem[]>([]);
	const [indicator, setIndicators] = useState<SeriessType>({
		id: '',
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
		seasonal_adjustment_short: ''
	});

	const { data: favorite, isSuccess: isFavoriteExist } = useQuery({
		queryKey: [const_queryKey.favorite, categoryId],
		queryFn: () => getFavorite(user.id, Number(categoryId))
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

		const isFind = favorite.find((indicator: Indicator) => indicator.seriesId === seriesId);

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
		getChartData(seriesId as string)
			.then(chartDatas => {
				const { dataArray } = chartDatas;
				setChartDatas(dataArray);
			})
			.catch(err => {
				console.error(err.message);
			});

		getIndicator(seriesId as string).then((indicator: SeriessType) => {
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
				popularity,
				seasonal_adjustment,
				seasonal_adjustment_short
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
	}, []);

	// save, delete 상황을 확인하는 useEffect
	useEffect(() => {
		if (favorite?.some((el: Indicator) => el.seriesId === seriesId)) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [favorite]);

	return (
		<>
			<main className={clsx(styles.Morepage, poppins.variable, roboto.variable)}>
				{chartDatas.length && indicator && (
					<LineChart indicator={indicator} values={chartDatas} width={100} height={50}>
						{user.isLogin ? (
							<button className={isActive ? clsx(styles.on) : clsx('')} onClick={buttonHandler}>
								{isActive ? 'delete' : 'save'}
							</button>
						) : (
							<button onClick={buttonHandler}>save</button>
						)}
					</LineChart>
				)}
				<ChartDescription indicator={indicator}>
					<BubblePopButton clickHandler={buttonHandler} className={isActive ? clsx(styles.on) : ''}>
						{isActive ? 'remove' : 'save'}
					</BubblePopButton>
				</ChartDescription>
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
				rightButtonHandler={() => router.push(`${frontUrl}/login`)}
			/>
		</>
	);
}

/* promise 와 async/await 의 차이점
	[ async-await ] => '변수선언 = 비동기함수결과' 의 직관적인 코드 작성가능하다.
	try {
		const { realtime_start, realtime_end, dataArray } = await getChartDataseriesId as string);
		return { realtime_start, realtime_end, dataArray };
	} catch (err) {
		console.error()
		return 'fallback value';
	}

	[ promise ] => 'promise 객체의 then 에서 변수선언 후 처리하는 방식으로 상대적으로 직관적이지 않다.'
	getChartData(seriesId as string).then((result) => {
		const { realtime_start, realtime_end, dataArray } = result;
	})

	[ useEffect 에서 async vs promise ]
	promise 가 개인적으로 맘에드는 이유는 useEffect 에서 await 를 쓰기 위해서는 async() => {}(); 꼴의
	비동기 즉시실행함수를 사용해야하기 때문에 프로미스를 생각했다.
*/
