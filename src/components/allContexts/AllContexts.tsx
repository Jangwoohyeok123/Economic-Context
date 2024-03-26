import clsx from 'clsx';
import styles from './AllContexts.module.scss';
import { useQuery } from '@tanstack/react-query';
import const_queryKey from '@/const/queryKey';
import { useSelector } from 'react-redux';
import { Store_Type } from '@/types/redux';
import { addEllipsis, changeDate } from '@/utils/cleanString';
import { FaPlus } from 'react-icons/fa6';
import { Context_Type } from '@/types/context';
import { getAllContext_List } from '@/api/context';

interface AllContexts {
	selectedContext: string;
	setSelectedContext: React.Dispatch<React.SetStateAction<string>>;
}
export default function AllContexts({ selectedContext, setSelectedContext }: AllContexts) {
	const userId = useSelector((store: Store_Type) => store.user.id);
	const { data: allContexts, isLoading: isAllContextsLoading } = useQuery<Context_Type[]>({
		queryKey: [const_queryKey.context, 'all'],
		queryFn: () => getAllContext_List(userId)
	});

	if (isAllContextsLoading) {
		<div>Loading...</div>;
	}

	return (
		<section className={clsx(styles.AllContexts)}>
			<div className={clsx(styles.header)}>
				<h2>My Context</h2>
				<span onClick={() => setSelectedContext('Indicators')}>
					<FaPlus />
				</span>{' '}
				{/*TODO :: 클릭하면 indicators로 이동*/}
			</div>
			<div className={clsx(styles.contextCardList)}>
				{allContexts?.map((context: Context_Type, index: number) => {
					const { id: contextId, name, createdAt } = context;

					return (
						<div key={index} onClick={() => setSelectedContext(name)} className={clsx(styles.contextCard)}>
							<div className={clsx(styles.cover)}></div>
							<span className={clsx(styles.name)}>{addEllipsis(name, 10)}</span>
							<span className={clsx(styles.date)}>{changeDate(createdAt.toString())}</span>
						</div>
					);
				})}
			</div>
		</section>
	);
}
