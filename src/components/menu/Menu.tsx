import clsx from 'clsx';
import styles from './Menu.module.scss';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Store_Type } from '@/types/redux';
import const_queryKey from '@/const/queryKey';
import { useContext, useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { deleteContext, getContextNameWithKey_List } from '@/api/context';
import { ContextNameWithKey_Type } from '@/types/context';
import { SelectedTabContext } from '@/store/selectedTab-context';

export default function Menu() {
	const { selectedTab, setSelectedTab } = useContext(SelectedTabContext);
	const tabs = ['Indicators', 'MyContext'];
	const queryClient = useQueryClient();
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);
	const userId = useSelector((state: Store_Type) => state.user.id);
	const { data: contextIdsWithNames, isLoading } = useQuery<ContextNameWithKey_Type[]>({
		queryKey: [const_queryKey.context, 'names'],
		queryFn: () => getContextNameWithKey_List(userId)
	});

	const deleteContextMutation = useMutation({
		mutationFn: (contextId: number) => deleteContext(contextId),
		onSuccess() {
			if (contextIdsWithNames) {
				const newContextIdsWithNames = contextIdsWithNames.filter((context: ContextNameWithKey_Type) => context.name !== selectedTab);
				queryClient.setQueryData([const_queryKey.context, 'names'], newContextIdsWithNames); // 내일 정리하기
				queryClient.invalidateQueries({
					queryKey: [const_queryKey.context, 'names']
				});

				if (contextIdsWithNames.length >= 2) {
					const currentIndex = contextIdsWithNames.findIndex((context: ContextNameWithKey_Type) => {
						return context.name.trim() === selectedTab.trim();
					});

					setSelectedTab(contextIdsWithNames[currentIndex - 1].name);
				} else {
					setSelectedTab(tabs[1]);
				}
			}
		},
		onError(error) {
			console.error(error);
		}
	});

	const tabClick = (name: string) => {
		setSelectedTab(name);
		if (name === 'Indicators') setIsAccordionOpen(false);
		if (name === 'MyContext') setIsAccordionOpen(!isAccordionOpen);
	};

	return (
		<aside className={clsx(styles.Menu)}>
			<nav>
				<Link href='/' className={clsx(styles.logo)}>
					EconomicContext
				</Link>

				{tabs.map((name, idx) => {
					return (
						<span key={idx} onClick={() => tabClick(name)} className={selectedTab === name ? clsx(styles.on) : ''}>
							{name}
						</span>
					);
				})}

				<div className={clsx(styles.contexts)}>
					{isAccordionOpen &&
						contextIdsWithNames?.map((context: ContextNameWithKey_Type, index: number) => {
							const { id: contextId, name } = context;

							return (
								<div key={index} onClick={() => setSelectedTab(name)} className={clsx(styles.context, { [styles.on]: selectedTab === name })}>
									<span>{name}</span>
									<span className={clsx(styles.deleteIcon)} onClick={() => deleteContextMutation.mutate(contextId)}>
										<RiDeleteBin6Line />
									</span>
								</div>
							);
						})}
				</div>
			</nav>
		</aside>
	);
}
