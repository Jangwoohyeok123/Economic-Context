import clsx from 'clsx';
import styles from './CurrentContext.module.scss';
import const_queryKey from '@/const/queryKey';
import { useQuery } from '@tanstack/react-query';
import ChartSwiper from '../chartSwiper/ChartSwiper';
import ChartList from '../chartList/ChartList';
import { Context_Type } from '@/types/context';
import { getContext } from '@/api/context';
import { FavoriteIndicator_Type } from '@/types/favorite';
import CategoryTabMenu from '../categoryTabMenu/CategoryTabMenu';

interface CurrentContext_Props {
	currentContextId: number;
}

export default function CurrentContext({ currentContextId }: CurrentContext_Props) {
	const { data: currentContext, isLoading } = useQuery<Context_Type>({
		queryKey: [const_queryKey.context, 'getContext', currentContextId],
		queryFn: () => getContext(currentContextId)
	});

	if (isLoading) return <div>Loading...</div>;

	const [seriesIds, categoryIds]: [string[], number[]] = [[], []];
	currentContext?.customIndicators.forEach((indicator: FavoriteIndicator_Type) => {
		seriesIds.push(indicator.seriesId);
		categoryIds.push(indicator.categoryId);
	});

	return (
		<section className={clsx(styles.CurrentContext)}>
			{/* <CategoryTabMenu /> */}
			{/* {seriesIds && <ChartSwiper seriesIds={seriesIds} />} */}
			{seriesIds && categoryIds && <ChartList seriesIds={seriesIds} categoryIds={categoryIds} />}
		</section>
	);
}
