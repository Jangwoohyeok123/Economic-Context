import clsx from 'clsx';
import styles from './MyContext.module.scss';
import { useSelector } from 'react-redux';
import { Store } from '@/types/reduxType';
import const_queryKey from '@/const/queryKey';
import { getAllContexts, getContext, getContextNamesWithKey } from '@/backendApi/user';
import { useQuery } from '@tanstack/react-query';
import { ContextNameWithKey, Indicator } from '@/types/userType';
import CategoryTab from '../categoryTab/CategoryTab';
import { categoryNames } from '@/pages/_app';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';

interface MyContextTabProps {
	selectedTab: string;
	setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function MyContextTab({ selectedTab, setSelectedTab }: MyContextTabProps) {
	const userId = useSelector((state: Store) => state.user.id);

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
	}

	if (isContextNamesWithKeyLoading) {
		return <div className={clsx(styles.MyContext)}>loading...</div>;
	}

	if (isContextLoading) {
		return <div className={clsx(styles.MyContext)}>loading...</div>;
	}

	return (
		<div className={clsx(styles.MyContext)}>
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
