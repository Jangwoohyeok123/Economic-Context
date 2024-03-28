import clsx from 'clsx';
import styles from './JournalsSection.module.scss';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import const_queryKey from '@/const/queryKey';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { CgCloseR } from 'react-icons/cg';
import { getContextJournal_List } from '@/api/journal';
import JournalListTable from './JournalListTable/JournalListTable';
import JournalWrite from './JournalWrite/JournalWrite';

interface Journal_Props {
	contextId: number;
}

export default function Journal({ contextId }: Journal_Props) {
	const [isWrite, setIsWrite] = useState(false);

	const { data: contextJournal_List, isLoading: isContextJournalListLoading } = useQuery({
		queryKey: [const_queryKey.journal, contextId],
		queryFn: () => getContextJournal_List(contextId as number)
	});

	const toggleJournalFormButton = (e: React.FormEvent<HTMLSpanElement>) => {
		e.preventDefault();
		setIsWrite(prev => !prev);
	};

	useEffect(() => {
		// journal 데이터가 있고 항목이 하나 이상 있는 경우 isOpen을 true로 설정
		if (contextJournal_List && contextJournal_List.length > 0) {
			setIsWrite(false);
		} else {
			setIsWrite(true); // 그렇지 않으면 false로 설정
		}
	}, [contextJournal_List]);

	return (
		<div className={clsx(styles.Journal)}>
			<section className={clsx(styles.JournalHeader)}>
				<h3>Journal</h3>
				<span className={clsx(styles.JournalFormIcon)} onClick={e => toggleJournalFormButton(e)}>
					{isWrite ? <CgCloseR /> : <HiMiniPencilSquare />}
				</span>
			</section>

			{isWrite && <JournalWrite contextId={contextId} setIsWrite={setIsWrite} />}
			{contextJournal_List && (
				<JournalListTable
					contextJournal_List={contextJournal_List}
					isContextJournalListLoading={isContextJournalListLoading}
				/>
			)}
		</div>
	);
}
