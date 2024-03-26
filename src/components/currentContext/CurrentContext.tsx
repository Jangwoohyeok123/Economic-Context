import clsx from 'clsx';
import styles from './CurrentContext.module.scss';
import const_queryKey from '@/const/queryKey';
import { useQuery } from '@tanstack/react-query';
import ChartSwiper from '../chartSwiper/ChartSwiper';
import Journal from '../journalsSection/JournalsSection';
import ChartList from '../chartList/ChartList';
import { Context_Type } from '@/types/context';
import { getContext } from '@/api/context';
import { FavoriteIndicator_Type } from '@/types/favorite';

interface CurrentContextProps {
	currentContextId: number;
}

export default function CurrentContext({ currentContextId }: CurrentContextProps) {
	const { data: currentContext, isLoading } = useQuery<Context_Type>({
		queryKey: [const_queryKey.context, currentContextId],
		queryFn: () => getContext(currentContextId)
	});

	if (isLoading) return <div>Loading...</div>;

	const seriesIds = currentContext?.customIndicators.map((indicator: FavoriteIndicator_Type) => {
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
