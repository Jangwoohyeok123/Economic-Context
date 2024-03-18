import clsx from 'clsx';
import styles from './MyContext.module.scss';
import { useSelector } from 'react-redux';
import { Store } from '@/types/reduxType';
import const_queryKey from '@/const/queryKey';
import { getContext, getContextNamesAndKey as getContextNamesWithKey } from '@/backendApi/user';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ContextNameWithKey } from '@/types/userType';
import CategoryTab from '../categoryTab/CategoryTab';
import { categoryNames } from '@/pages/_app';

interface MyContextTabProps {
	selectedTab: string;
	setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function MyContextTab({ selectedTab, setSelectedTab }: MyContextTabProps) {
	const userId = useSelector((state: Store) => state.user.id);
	const [contextId, setContextId] = useState<number>(0);

	const { data: contextNamesWithKey, isLoading } = useQuery({
		queryKey: [const_queryKey.context, 'names'],
		queryFn: () => getContextNamesWithKey(userId)
	});

	/** MyContext 가 아닌 context 라면 fethcing 을 위해 contextId 를 변경한다. */
	useEffect(() => {
		if (selectedTab === 'MyContext') return;
		const currentContext = contextNamesWithKey?.find((context: ContextNameWithKey) => context.name === selectedTab);
		setContextId(currentContext.id);
	}, [selectedTab]);

	const { data: context } = useQuery({
		queryKey: [const_queryKey.context, selectedTab],
		queryFn: () => getContext(userId)
	});

	return (
		<section className={clsx(styles.MyContext)}>
			<CategoryTab categoryNames={categoryNames} />
			{selectedTab === 'MyContext' ? <div>here is myContext</div> : <div>here is otherwise</div>}
		</section>
	);
}
