import clsx from 'clsx';
import styles from './CurrentContext.module.scss';
import const_queryKey from '@/const/queryKey';
import { getContext, getContextIdsWithNames } from '@/backendApi/user';
import { Store } from '@/types/reduxType';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { ContextType } from '@/types/userType';

interface CurrentContextProps {
	currentContextId: number;
}

export default function CurrentContext({ currentContextId }: CurrentContextProps) {
	const { data: currentContext, isLoading } = useQuery<ContextType>({
		queryKey: [const_queryKey.context, currentContextId],
		queryFn: () => getContext(currentContextId)
	});

	if (isLoading) return <div>Loading...</div>;

	return (
		<section className={clsx(styles.CurrentContext)}>
			<div>Chart공간</div>
			<div>journal 공간</div>
		</section>
	);
}
