import clsx from 'clsx';
import styles from './Menu.module.scss';
import Link from 'next/link';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteContext, getContext, getContextNames } from '@/backendApi/user';
import { useSelector } from 'react-redux';
import { Store } from '@/types/reduxType';
import const_queryKey from '@/const/queryKey';
import { useState } from 'react';

interface MenuProps {
	selectedTab: string;
	setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function Menu({ selectedTab, setSelectedTab }: MenuProps) {
	const userId = useSelector((state: Store) => state.user.id);
	const tabs = ['Indicators', 'MyContext'];
	const { data: contextNames, isLoading } = useQuery({
		queryKey: [const_queryKey.context, 'names'],
		queryFn: () => getContextNames(userId)
	});

	const [curContextName, setCurContext] = useState<string>();
	const { data: context } = useQuery({
		queryKey: [const_queryKey.context, curContextName],
		queryFn: () => getContext(userId)
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
					{contextNames?.map((name: string, index: number) => {
						return (
							<span key={index} onClick={() => setCurContext(name)}>
								{name}
							</span>
						);
					})}
				</div>
			</nav>
		</aside>
	);
}
