import clsx from 'clsx';
import styles from './CurrentContext.module.scss';
import const_queryKey from '@/const/queryKey';
import { getContext, getContextIdsWithNames } from '@/api/backend';
import { useQuery } from '@tanstack/react-query';
import { Context_Type, Indicator_Type } from '@/types/userType';
import ChartSwiper from '../chartSwiper/ChartSwiper';
import Journal from '../journalsSection/JournalsSection';
import ChartList from '../chartList/ChartList';
interface CurrentContextProps {
	currentContextId: number;
}

export default function CurrentContext({ currentContextId }: CurrentContextProps) {
	const { data: currentContext, isLoading } = useQuery<Context_Type>({
		queryKey: [const_queryKey.context, currentContextId],
		queryFn: () => getContext(currentContextId)
	});

	if (isLoading) return <div>Loading...</div>;

	const seriesIds = currentContext?.customIndicators.map((indicator: Indicator_Type) => {
		return indicator.seriesId;
	});

	return (
		<section className={clsx(styles.CurrentContext)}>
			<h2>Context Chart List</h2>
			{/* {seriesIds && <ChartSwiper seriesIds={seriesIds} />} */}
			{seriesIds && <ChartList seriesIds={seriesIds} />}

			{currentContext && <Journal contextId={currentContext.id} />}
		</section>
	);
}
