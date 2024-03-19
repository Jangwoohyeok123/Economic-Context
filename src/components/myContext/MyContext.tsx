import clsx from 'clsx';
import styles from './MyContext.module.scss';
import { useSelector } from 'react-redux';
import { Store } from '@/types/reduxType';
import const_queryKey from '@/const/queryKey';
import { getAllContexts, getContext, getContextNamesWithKey } from '@/backendApi/user';
import { getChartData, getIndicator } from '@/backendApi/fred';
import { cleanString } from '@/utils/cleanString';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ContextNameWithKey, Indicator } from '@/types/userType';
import CategoryTab from '../categoryTab/CategoryTab';
import { categoryNames } from '@/pages/_app';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import LineChart from '../charts/line/LineChart';
import { Seriess_Type } from '@/types/fredType';
import { useRouter } from 'next/router';

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
	const router = useRouter();
	const [contextFirstid, setContextFirstid] = useState<string>('');
	const [chartDatas, setChartDatas] = useState<DataItem[]>([]);
	const [indicators, setIndicators] = useState<Seriess_Type>({
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
		queryFn: () => getContext(currentContext.id as number)
	});

	if (isContextsLoading) {
		return <div className={clsx(styles.MyContext)}>loading...</div>;
	} else if (isContextNamesWithKeyLoading) {
		return <div className={clsx(styles.MyContext)}>loading...</div>;
	} else if (isContextLoading) {
		return <div className={clsx(styles.MyContext)}>loading...</div>;
	}
	getChartData(context[0]?.id as string)
		.then(chartDatas => {
			const { dataArray } = chartDatas;
			setChartDatas(dataArray);
		})
		.catch(err => {
			console.error(err.message);
		});

	getIndicator(context[0]?.id as string).then((indicator: Seriess_Type) => {
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
	return (
		<div className={clsx(styles.MyContext)}>
			<LineChart indicators={indicators} values={chartDatas}>
				<span>test</span>
			</LineChart>
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
