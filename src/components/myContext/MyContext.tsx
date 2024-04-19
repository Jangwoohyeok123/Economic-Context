import clsx from 'clsx';
import styles from './MyContext.module.scss';
import { useSelector } from 'react-redux';
import { Store_Type } from '@/types/redux';
import const_queryKey from '@/const/queryKey';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// Import Swiper styles
import 'swiper/css';
import AllContexts from '../allContexts/AllContexts';
import CurrentContext from '../currentContext/CurrentContext';
import { ContextNameWithKey_Type } from '@/types/context';
import { getContextNameWithKey_List } from '@/api/context';
import Profile from './propfile/Profile';

interface MyContextTab_Props {
	selectedTab: string;
	setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function MyContextTab({ selectedTab, setSelectedTab }: MyContextTab_Props) {
	const userId = useSelector((state: Store_Type) => state.user.id);
	const [currentContextId, setCurrentContextId] = useState<number | undefined>();
	const [selectedContext, setSelectedContext] = useState<string>('');

	const { data: contextIdsWithNames, isLoading } = useQuery<ContextNameWithKey_Type[]>({
		queryKey: [const_queryKey.context, 'names'],
		queryFn: () => getContextNameWithKey_List(userId)
	});

	// selectedTab 이 변경될 때마다 currentContextId 를 찾아서 CurrentContext 로 전달
	useEffect(() => {
		if (contextIdsWithNames) {
			const currentContextIdWithName = contextIdsWithNames?.find(contextIdWithName => contextIdWithName.name === selectedTab);

			if (currentContextIdWithName) setCurrentContextId(currentContextIdWithName.id);
		}
	}, [selectedTab, contextIdsWithNames]);

	useEffect(() => {
		if (selectedContext === 'Indicators') {
			setSelectedTab('Indicators');
		} else if (contextIdsWithNames) {
			const currentContextIdWithName = contextIdsWithNames?.find(contextIdWithName => contextIdWithName.name === selectedContext);

			if (currentContextIdWithName) {
				setCurrentContextId(currentContextIdWithName.id);
				setSelectedTab(currentContextIdWithName.name);
			}
		}
	}, [selectedContext, contextIdsWithNames]);

	if (isLoading) return <div className={clsx(styles.MyContext)}>loading...</div>;
	return (
		<div className={clsx(styles.MyContext)}>
			<Profile />
			{selectedTab === 'MyContext' ? (
				<AllContexts selectedContext={selectedContext} setSelectedContext={setSelectedContext} />
			) : (
				currentContextId && <CurrentContext currentContextId={currentContextId} />
			)}
		</div>
	);
}
