import clsx from 'clsx';
import styles from './Menu.module.scss';
import Link from 'next/link';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteContext, getContext, getContextNamesAndKey } from '@/backendApi/user';
import { useSelector } from 'react-redux';
import { Store } from '@/types/reduxType';
import const_queryKey from '@/const/queryKey';
import { useEffect, useState } from 'react';
import { ContextNameWithKey } from '@/types/userType';

interface MenuProps {
	selectedTab: string;
	setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
	currentContext: string;
	setCurrentContext: React.Dispatch<React.SetStateAction<string>>;
}

export default function Menu({ selectedTab, setSelectedTab, currentContext, setCurrentContext }: MenuProps) {
	const tabs = ['Indicators', 'MyContext'];
	const userId = useSelector((state: Store) => state.user.id);
	const { data: contextNamesWithKey, isLoading } = useQuery({
		queryKey: [const_queryKey.context, 'names'],
		queryFn: () => getContextNamesAndKey(userId)
	});
	const [contextId, setContextId] = useState<number>(0);

	useEffect(() => {
		const currentContext = contextNamesWithKey?.find((element: ContextNameWithKey) => element.name === selectedTab);
		setContextId(currentContext?.id);
	}, [selectedTab]);

	const { data: context } = useQuery({
		queryKey: [const_queryKey.context, selectedTab],
		queryFn: () => getContext(contextId)
	});

	return (
		<aside className={clsx(styles.Menu)}>
			<nav>
				<Link href='/' className={clsx(styles.logo)}>
					EconomicContext
				</Link>

				{tabs.map((name, idx) => {
					return (
						<span key={idx} onClick={() => setSelectedTab(name)}>
							{name}
						</span>
					);
				})}

				<div className={clsx(styles.contexts)}>
					{contextNamesWithKey?.map((context: ContextNameAndKey, index: number) => {
						return (
							<span key={index} onClick={() => setSelectedTab(context.name)}>
								{context.name}
							</span>
						);
					})}
				</div>
			</nav>
		</aside>
	);
}
