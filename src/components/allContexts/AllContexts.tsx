import clsx from 'clsx';
import styles from './AllContexts.module.scss';
import { useQuery } from '@tanstack/react-query';
import const_queryKey from '@/const/queryKey';
import { getAllContexts } from '@/api/backend';
import { Context_Type } from '@/types/userType';
import { useSelector } from 'react-redux';
import { Store_Type } from '@/types/reduxType';

export default function AllContexts() {
	const userId = useSelector((store: Store_Type) => store.user.id);
	const { data: allContexts, isLoading } = useQuery<Context_Type[]>({
		queryKey: [const_queryKey.context, 'all'],
		queryFn: () => getAllContexts(userId)
	});

	if (isLoading) {
		<div>Loading...</div>;
	}

	return <section className={clsx(styles.AllContexts)}></section>;
}
