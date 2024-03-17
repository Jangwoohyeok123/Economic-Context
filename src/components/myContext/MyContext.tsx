import clsx from 'clsx';
import styles from './MyContext.module.scss';
import { useSelector } from 'react-redux';
import { Store } from '@/types/reduxType';
import const_queryKey from '@/const/queryKey';
import { getContext, getContextNamesAndKey as getContextNamesWithKey } from '@/backendApi/user';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ContextNameWithKey } from '@/types/userType';

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

	/* 
		selectedTab 이 변하면 context 데이터를 페칭한다.
		selectedTab 이 변하면 contextId 를 찾을 수 있어야한다. 
		현재, selectedTab 이 변하면 contextNames 가 변한다.

		contextId 는 현재 selectedTab 을 뜻하는 id 다.
		contextNames 에서 selectedTab 을 find 한다. 
		그 객체의 id 를 contextId 에게 전달한다.

		getContext 에 contextId 를 전달해야한다. 
	*/

	useEffect(() => {
		const currentContext = contextNamesWithKey.find(context => context.name === selectedTab);
		setContextId(currentContext.id);
	}, [selectedTab]);

	const { data: context } = useQuery({
		queryKey: [const_queryKey.context, selectedTab],
		queryFn: () => getContext(userId)
	});

	return (
		<section className={clsx(styles.MyContext)}>
			{selectedTab === 'MyContext' ? <div>here is myContext</div> : <div>here is otherwise</div>}
		</section>
	);
}
