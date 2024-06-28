import clsx from 'clsx';
import styles from './Menu.module.scss';
import { FavoriteContainer, LeftContainer, RightContainer } from '@/styles/IndicatorsTab.style';
import { deleteContext, getContextNameWithKey_List } from '@/api/context';
import const_queryKey from '@/const/queryKey';
import { ContextNameWithKey_Type } from '@/types/context';
import { Store_Type } from '@/types/redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Link from 'next/link';
import Profile from '@/components/myContext/propfile/Profile';
import AllContexts from '@/components/allContexts/AllContexts';
import JournalSection from '@/components/journalsSection/JournalSection';
import CurrentContext from '@/components/currentContext/CurrentContext';
import const_categoryId, { categoryIds } from '@/const/categoryId';
import useFavoriteMutation from '@/hooks/useFavoriteMutation';
import useFavoriteQuery from '@/hooks/useFavoriteQuery';
import { FavoriteIndicator_Type } from '@/types/favorite';
import DashHeader from '@/components/dashheader/DashHeader';
import CategoryTabMenu from '@/components/categoryTabMenu/CategoryTabMenu';
import Accordian from '@/components/accordian/Accordian';
import CreateContextSection from '@/components/createContextSection/CreateContextSection';

interface TabMenuViewContextType {
	selectedTab: string;
	setSelectedTab: (tab: string) => void;
	updateTab?: (tab: string) => void;
}

interface MenuProps {
	tabs: string[];
}

interface TabMenuViewerProps {
	initTab?: string;
	children?: React.ReactNode;
}

const TabMenuViewContext = createContext<TabMenuViewContextType | null>(null);

export const useTabMenuViewer = () => {
	const context = useContext(TabMenuViewContext);
	if (!context) throw new Error('This component must be used within a <TabMenuViewContext> component.');
	return context;
};

export const TabMenuViewer = ({ initTab, children }: TabMenuViewerProps) => {
	const [selectedTab, setSelectedTab] = useState<string>(initTab || 'Indicators');
	return <TabMenuViewContext.Provider value={{ selectedTab, setSelectedTab }}>{children}</TabMenuViewContext.Provider>;
};

function TabMenu({ tabs }: MenuProps) {
	const { selectedTab, setSelectedTab } = useTabMenuViewer();
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

function IndicatorsTab() {
	const { deleteFavoriteMutationAll } = useFavoriteMutation();
	const { allFavorites_List } = useFavoriteQuery();
	const [currentCategoryId, setCurrentCategoryId] = useState<number>(const_categoryId.interest_mortgage);
	const [checkedFavorite_List, setCheckedFavorite_List] = useState<FavoriteIndicator_Type[]>([]);
	const refFavoriteList = useRef<HTMLDivElement>(null);

	if (!allFavorites_List) return <div>isLoading</div>;

	const curFavorites_List = allFavorites_List?.filter(favorite => favorite.categoryId === currentCategoryId);

	const pickIndicator = (favoriteIndicator: FavoriteIndicator_Type) => {
		setCheckedFavorite_List(prev => {
			if (prev.find(item => item.seriesId === favoriteIndicator.seriesId)) return prev.filter(item => item.seriesId !== favoriteIndicator.seriesId);

			return [...prev, favoriteIndicator];
		});
	};

	const allClick = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = e.target;

		if (checked) setCheckedFavorite_List(prev => [...new Set([...prev, ...curFavorites_List])]);
		else {
			const idsToRemove = new Set(curFavorites_List.map(item => item.seriesId));
			setCheckedFavorite_List(prev => prev.filter(item => !idsToRemove.has(item.seriesId)));
		}
	};

	const isSubset = (subset: FavoriteIndicator_Type[], superset: FavoriteIndicator_Type[]) => {
		if (subset.length === 0) return false;
		return subset.every(element => superset.includes(element));
	};

	return (
		<FavoriteContainer>
			<DashHeader tab={'Indicators'} />
			<LeftContainer>
				<div className='categoryTabMenuWrapper'>
					<CategoryTabMenu categoryIdList={categoryIds} selectedCategoryId={currentCategoryId} setSelectedCategoryId={setCurrentCategoryId} />
				</div>

				<div className='favoriteList' ref={refFavoriteList}>
					<div className='favoriteListHeader'>
						<input type='checkbox' checked={isSubset(curFavorites_List, checkedFavorite_List)} onChange={allClick} />
						<h4>Indicator</h4>
					</div>
					{curFavorites_List.length > 0
						? curFavorites_List?.map((favoriteIndicator: FavoriteIndicator_Type, index: number) => {
								const { title } = favoriteIndicator;

								return (
									<div key={index} className='item' onClick={() => pickIndicator(favoriteIndicator)}>
										<input
											type='checkbox'
											checked={checkedFavorite_List.some(checkedFavoriteIndicator => {
												return checkedFavoriteIndicator.seriesId === favoriteIndicator.seriesId;
											})}
										/>
										<h4>{title}</h4>
									</div>
								);
						  })
						: '이 페이지는 작업이 필요해'}
				</div>
			</LeftContainer>
			<RightContainer>
				<div className='header'>
					<h2>Create Context</h2>
					<span>make your custom context</span>
				</div>
				<div className='contextName'>
					<div>
						<h3>Context Name</h3>
						<Accordian />
					</div>
					<input type='text' placeholder='write your context name' />
				</div>

				<CreateContextSection checkedFavorite_List={checkedFavorite_List} setCheckedFavorite_List={setCheckedFavorite_List} />
			</RightContainer>
		</FavoriteContainer>
	);
}

function MyContextTab() {
	const { selectedTab, setSelectedTab } = useTabMenuViewer();
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
			<DashHeader tab={'MyContext'} />
			<Profile />
			{selectedTab === 'MyContext' ? (
				<AllContexts selectedContext={selectedContext} setSelectedContext={setSelectedContext} />
			) : (
				currentContextId && <CurrentContext currentContextId={currentContextId} />
			)}
			<JournalSection type={selectedTab === 'MyContext' ? 'myContext' : 'currentContext'} />
		</div>
	);
}

TabMenuViewer.TabMenu = TabMenu;
TabMenuViewer.MyContextTab = MyContextTab;
TabMenuViewer.IndicatorsTab = IndicatorsTab;

export default TabMenuViewer;
