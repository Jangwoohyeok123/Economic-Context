import clsx from 'clsx';
import styles from './Menu.module.scss';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteContext, getContext, getContextIdsWithNames } from '@/api/backend';
import { useSelector } from 'react-redux';
import { Store_Type } from '@/types/reduxType';
import const_queryKey from '@/const/queryKey';
import { useEffect, useState } from 'react';
import { ContextIdWithName_Type } from '@/types/userType';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface MenuProps {
	selectedTab: string;
	setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function Menu({ selectedTab, setSelectedTab }: MenuProps) {
	const tabs = ['Indicators', 'MyContext'];
	const queryClient = useQueryClient();
	const [isAccordianOpen, setIsAccordianOpen] = useState(false);
	const userId = useSelector((state: Store_Type) => state.user.id);
	const { data: contextIdsWithNames, isLoading } = useQuery<ContextIdWithName_Type[]>({
		queryKey: [const_queryKey.context, 'names'],
		queryFn: () => getContextIdsWithNames(userId)
	});

	const deleteContextMutation = useMutation({
		mutationFn: (contextId: number) => deleteContext(contextId),
		onSuccess() {
			// if (contextIdsWithNames) {
			// 	const { id: contextId } = contextIdsWithNames?.find(
			// 		(context: ContextIdWithName) => context.name === selectedTab
			// 	);
			// 	console.log('contextIdsWithNames', contextIdsWithNames);
			// 	queryClient.invalidateQueries({
			// 		queryKey: [const_queryKey.context]
			// 	});
			// }
			if (contextIdsWithNames) {
				const newContextIdsWithNames = contextIdsWithNames.filter(
					(context: ContextIdWithName_Type) => context.name !== selectedTab
				);
				queryClient.setQueryData([const_queryKey.context, 'names'], newContextIdsWithNames); // 내일 정리하기
				queryClient.invalidateQueries({
					queryKey: [const_queryKey.context, 'names']
				});

				if (contextIdsWithNames.length >= 2) {
					// 왜 -1 ?
					const currentIndex = contextIdsWithNames.findIndex((context: ContextIdWithName_Type) => {
						return context.name.trim() === selectedTab.trim();
					});

					setSelectedTab(contextIdsWithNames[currentIndex - 1].name);
				} else {
					// 통과
					setSelectedTab(tabs[1]);
				}
			}

			/*
				contextIdsWithNames 가 2개 이상이라면
				selectedTab 이 이전으로 이동한다.
				만약, 1개라면 myContext Tab 으로 이동한다.
			*/
		},
		onError(error) {
			console.error(error);
		}
	});

	const tabClick = (name: string) => {
		setSelectedTab(name);
		if (name === 'Indicators') setIsAccordianOpen(false);
		if (name === 'MyContext') setIsAccordianOpen(!isAccordianOpen);
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
					{isAccordianOpen &&
						contextIdsWithNames?.map((context: ContextIdWithName_Type, index: number) => {
							const { id: contextId, name } = context;

							return (
								<div
									key={index}
									onClick={() => setSelectedTab(name)}
									className={clsx(styles.context, { [styles.on]: selectedTab === name })}>
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

/*
								<div key={index} className={clsx(styles.context)}>
									<span
										onClick={() => setSelectedTab(context.name)}
										className={selectedTab === context.name ? clsx(styles.on) : ''}>
										{context.name}
										<RiDeleteBin6Line />
									</span>
								</div>

*/
