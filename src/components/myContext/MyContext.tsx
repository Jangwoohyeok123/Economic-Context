import clsx from 'clsx';
import styles from './MyContext.module.scss';
import { useSelector } from 'react-redux';
import { Store } from '@/types/reduxType';
import const_queryKey from '@/const/queryKey';
import { getContext, getContextNamesAndKey as getContextNamesWithKey, getContexts } from '@/backendApi/user';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
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

	const [contextId, setContextId] = useState<number>();

	// back 수정시 사용할 쿼리
	const { data: contexts, isLoading: isContextsLoading } = useQuery({
		queryKey: [const_queryKey.context],
		queryFn: () => getContexts(userId)
	});

	const { data: context, isLoading: isContextLoading } = useQuery({
		queryKey: [const_queryKey.context, selectedTab],
		queryFn: () => getContext(contextId as number),
		enabled: !!contextId
	});

	/** MyContext 가 아닌 context 라면 fethcing 을 위해 contextId 를 변경한다. */
	useEffect(() => {
		if (selectedTab === 'MyContext') return;
		const currentContext = contextNamesWithKey?.find((context: ContextNameWithKey) => context.name === selectedTab);
		setContextId(currentContext.id);
	}, [selectedTab]);

	if (isContextsLoading) {
		return <div>loading...</div>;
	}

	if (isContextNamesWithKeyLoading) {
		return <div>loading...</div>;
	}

	if (isContextLoading) {
		return <div>loading...</div>;
	}

	return (
		<div className={clsx(styles.MyContext)}>
			{/* <CategoryTab categoryNames={categoryNames} /> */}
			{selectedTab === 'MyContext' ? (
				<section>myContext</section> // 나중에
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
