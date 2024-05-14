import clsx from 'clsx';
import styles from './AllContexts.module.scss';
import { useQuery } from '@tanstack/react-query';
import const_queryKey from '@/const/queryKey';
import { useSelector } from 'react-redux';
import { Store_Type } from '@/types/redux';
import { addEllipsis } from '@/utils/cleanString';
import { changeDateForm } from '@/utils/changeDate';
import { FaPlus, FaInfo, FaRegStar } from 'react-icons/fa6';
import { RiMore2Line } from 'react-icons/ri';
import { Context_Type } from '@/types/context';
import { getAllContexts_List } from '@/api/context';
import Folder from '@/public/folder.svg';
import Tooltip from '@mui/material/Tooltip';
import NoDataContext from './NoDataContext';
import { Dispatch, SetStateAction } from 'react';

interface AllContexts_Props {
	selectedContext: string;
	setSelectedContext: Dispatch<SetStateAction<string>>;
}
export default function AllContexts({ selectedContext, setSelectedContext }: AllContexts_Props) {
	const userId = useSelector((store: Store_Type) => store.user.id);
	const { data: allContexts, isLoading: isAllContextsLoading } = useQuery<Context_Type[]>({
		queryKey: [const_queryKey.context, 'all'],
		queryFn: () => getAllContexts_List(userId)
	});

	if (isAllContextsLoading) {
		<div>Loading...</div>;
	}
	const tooltipTitle = {
		guide1: "Let's go add indicators!",
		guide2: 'Click to proceed to the individual context page!'
	};
	return (
		<section className={clsx(styles.AllContexts)}>
			{allContexts && (
				<div className={clsx(styles.header)}>
					<h2></h2>
					<Tooltip
						title={tooltipTitle.guide1}
						placement='top'
						componentsProps={{
							tooltip: {
								sx: {
									width: 140,
									height: 40,
									bgcolor: '#fefefe',
									color: '#111',
									padding: 1,
									fontSize: '13px',
									whiteSpace: 'pre-line',
									border: 0,
									lineHeight: 1.2,
									boxShadow: '0px 0px 3px rgba(0,0,0,0.1)'
								}
							}
						}}>
						<span onClick={() => setSelectedContext('Indicators')}>
							<FaPlus />
						</span>
					</Tooltip>
				</div>
			)}
			<div className={clsx(styles.contextCardList)}>
				{allContexts ? (
					allContexts?.map((context: Context_Type, index: number) => {
						const { id: contextId, name, createdAt } = context;

						return (
							<div key={index} className={clsx(styles.contextCard)}>
								<div className={clsx(styles.cover)} onClick={() => setSelectedContext(name)}>
									<Folder fill={'#F1F4FC'} className={clsx(styles.folder)} />
									<span className={clsx(styles.name)}>{addEllipsis(name, 10)}</span>
									<span className={clsx(styles.date)}>{changeDateForm(createdAt.toString())}</span>
									<span className={clsx(styles.icon)}>
										<FaRegStar />
									</span>
								</div>
								{/* TODO:: 클릭 시 수정 & 삭제기능 있는 메뉴 노출로 수정 아래 툴팁은 임시 아이콘 : <RiMore2Line />*/}

								<Tooltip
									title={tooltipTitle.guide2}
									placement='top'
									componentsProps={{
										tooltip: {
											sx: {
												width: 140,
												height: 40,
												bgcolor: '#fefefe',
												color: '#333',
												padding: 1,
												fontSize: '11px',
												whiteSpace: 'pre-line',
												border: 0,
												lineHeight: 1.2,
												boxShadow: '0px 0px 3px rgba(0,0,0,0.1)'
											}
										}
									}}>
									<button>
										<FaInfo />
									</button>
								</Tooltip>
							</div>
						);
					})
				) : (
					<NoDataContext setSelectedContext={() => setSelectedContext('Indicators')} />
				)}
			</div>
		</section>
	);
}
