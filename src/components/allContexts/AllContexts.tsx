import clsx from 'clsx';
import styles from './AllContexts.module.scss';
import { useQuery } from '@tanstack/react-query';
import const_queryKey from '@/const/queryKey';
import { getAllContexts } from '@/api/backend';
import { ContextType } from '@/types/userType';
import { useSelector } from 'react-redux';
import { Store } from '@/types/reduxType';

export default function AllContexts() {
	const userId = useSelector((store: Store) => store.user.id);
	const { data: allContexts, isLoading } = useQuery<ContextType[]>({
		queryKey: [const_queryKey.context, 'all'],
		queryFn: () => getAllContexts(userId)
	});

	if (isLoading) {
		<div>Loading...</div>;
	}

	return <section className={clsx(styles.AllContexts)}></section>;
}
