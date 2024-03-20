import clsx from 'clsx';
import styles from './CurrentContext.module.scss';
import const_queryKey from '@/const/queryKey';
import { getContext, getContextIdsWithNames } from '@/backendApi/user';
import { Store } from '@/types/reduxType';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { ContextType, Indicator } from '@/types/userType';
import ChartSwiper from '../chartSwiper/ChartSwiper';

interface CurrentContextProps {
	currentContextId: number;
}

export default function CurrentContext({ currentContextId }: CurrentContextProps) {
	const { data: currentContext, isLoading } = useQuery<ContextType>({
		queryKey: [const_queryKey.context, currentContextId],
		queryFn: () => getContext(currentContextId)
	});

	if (isLoading) return <div>Loading...</div>;

	const seriesIds = currentContext?.customIndicators.map((indicator: Indicator) => {
		return indicator.seriesId;
	});

	return (
		<section className={clsx(styles.CurrentContext)}>
			{seriesIds && <ChartSwiper seriesIds={seriesIds} />}
			<div>journal 공간</div>
		</section>
	);
}
