import clsx from 'clsx';
import styles from './MyContext.module.scss';
import { useSelector } from 'react-redux';
import { Store } from '@/types/reduxType';
import const_queryKey from '@/const/queryKey';
import { getAllContexts, getContext, getContextIdsWithNames } from '@/api/backend';
import { useQueries, useQuery } from '@tanstack/react-query';
import { ContextIdWithName, Journal, ContextType } from '@/types/userType';
import CategoryTab from '../categoryTab/CategoryTab';
import { categoryNames } from '@/pages/_app';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import LineChart from '../charts/line/LineChart';
import { useEffect, useState } from 'react';
import { getChartData, getIndicator } from '@/api/fred';
import { Indicator } from '@/types/userType';
import { cleanString } from '@/utils/cleanString';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import ChartSwiper from '../chartSwiper/ChartSwiper';
import AllContexts from '../allContexts/AllContexts';
import CurrentContext from '../currentContext/CurrentContext';

interface MyContextTabProps {
	selectedTab: string;
	setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

interface DataItem {
	date: Date;
	value: number;
}

export default function MyContextTab({ selectedTab, setSelectedTab }: MyContextTabProps) {
	const userId = useSelector((state: Store) => state.user.id);
	const [currentContextId, setCurrentContextId] = useState<number | undefined>();

	const { data: contextIdsWithNames, isLoading } = useQuery<ContextIdWithName[]>({
		queryKey: [const_queryKey.context, 'names'],
		queryFn: () => getContextIdsWithNames(userId)
	});

	// selectedTab 이 변경될 때마다 currentContextId 를 찾아서 CurrentContext 로 전달
	useEffect(() => {
		if (contextIdsWithNames) {
			const currentContextIdWithName = contextIdsWithNames?.find(
				contextIdWithName => contextIdWithName.name === selectedTab
			);

			if (currentContextIdWithName) setCurrentContextId(currentContextIdWithName.id);
		}
	}, [selectedTab, contextIdsWithNames]);

	if (isLoading) return <div className={clsx(styles.MyContext)}>loading...</div>;

	return (
		<div className={clsx(styles.MyContext)}>
			{selectedTab === 'MyContext' ? (
				<AllContexts />
			) : (
				currentContextId && <CurrentContext currentContextId={currentContextId} />
			)}
		</div>
	);
}

// <section>
// 	{context?.customIndicators.map((indicator: Indicator, index: number) => {
// 		const { title, seriesId, categoryId, notes, frequency, popularity, observation_end, observation_start } =
// 			indicator;
// 		return (
// 			<IndicatorCard
// 				key={index}
// 				title={title}
// 				seriesId={seriesId}
// 				categoryId={categoryId}
// 				notes={notes}
// 				frequency={frequency}
// 				popularity={popularity}
// 				observation_end={observation_end}
// 				observation_start={observation_start}
// 				className={clsx(styles.IndicatorCard)}>
// 				<div>asd</div>
// 			</IndicatorCard>
// 		);
// 	})}
// </section>

// 서버데이터 중 일부를 state 처리하려면 어떻게 해야하지?

// const { data: context, isLoading: isContextLoading } = useQuery<ContextType>({
// 	queryKey: [const_queryKey.context, selectedTab],
// 	queryFn: () => getContext(currentContext.id)
// });

// const currentContext = contextNamesWithKey?.find((context: ContextNameWithKey) => context.name === selectedTab);
// const seriesIds =
// 	context?.customIndicators?.map((indicator: Indicator) => {
// 		return indicator.seriesId;
// 	}) || [];

// currentContext 는 현재 contextKey 를 전달받아야함
