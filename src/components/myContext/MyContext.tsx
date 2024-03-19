import clsx from 'clsx';
import styles from './MyContext.module.scss';
import { useSelector } from 'react-redux';
import { Store } from '@/types/reduxType';
import const_queryKey from '@/const/queryKey';
import { getAllContexts, getContext, getContextNamesWithKey } from '@/backendApi/user';
import { useQueries, useQuery } from '@tanstack/react-query';
import { ContextNameWithKey, Indicator } from '@/types/userType';
import CategoryTab from '../categoryTab/CategoryTab';
import { categoryNames } from '@/pages/_app';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import LineChart from '../charts/line/LineChart';
import { useEffect, useState } from 'react';
import { getChartData, getIndicator } from '@/backendApi/fred';
import { SeriessType } from '@/types/fredType';
import { cleanString } from '@/utils/cleanString';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import getChartValues from '@/pages/api/chartValues';
import ChartSwiper from '../chartSwiper/ChartSwiper';

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
	const [chartDatasForSwiper, setChartDatasForSwiper] = useState([]);
	const { data: contextNamesWithKey, isLoading: isContextNamesWithKeyLoading } = useQuery({
		queryKey: [const_queryKey.context, 'names'],
		queryFn: () => getContextNamesWithKey(userId)
	});

	const currentContext = contextNamesWithKey?.find((context: ContextNameWithKey) => context.name === selectedTab);

	const { data: allContexts, isLoading: isContextsLoading } = useQuery({
		queryKey: [const_queryKey.context],
		queryFn: () => getAllContexts(userId)
	});

	const { data: context, isLoading: isContextLoading } = useQuery({
		queryKey: [const_queryKey.context, selectedTab],
		queryFn: () => getContext(currentContext.id)
	});

	const seriesIds = context?.customIndicators?.map((indicator: Indicator) => {
		return indicator.seriesId;
	});

	const isLoadings = isContextsLoading || isContextNamesWithKeyLoading || isContextsLoading;

	if (isLoadings) return <div className={clsx(styles.MyContext)}>loading...</div>;

	return (
		<div className={clsx(styles.MyContext)}>
			{context ? (
				<ChartSwiper
					chartDatasForSwiper={chartDatasForSwiper}
					setChartDatasForSwiper={setChartDatasForSwiper}
					seriesIds={seriesIds ? seriesIds : []}
					context={context}
				/>
			) : (
				''
			)}

			{/* <CategoryTab categoryNames={categoryNames} /> */}
			{selectedTab === 'MyContext' ? (
				<section>myContext</section> // AllContext 를 이용해야하는 공간입니다.
			) : (
				<section>
					{context?.customIndicators.map((indicator: Indicator, index: number) => {
						const { title, seriesId, categoryId, notes, frequency, popularity, observation_end, observation_start } =
							indicator;
						return (
							<IndicatorCard
								key={index}
								title={title}
								seriesId={seriesId}
								categoryId={categoryId}
								notes={notes}
								frequency={frequency}
								popularity={popularity}
								observation_end={observation_end}
								observation_start={observation_start}
								className={clsx(styles.IndicatorCard)}>
								<div>asd</div>
							</IndicatorCard>
						);
					})}
				</section>
			)}
		</div>
	);
}

// me
