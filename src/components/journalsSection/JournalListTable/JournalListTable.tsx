import clsx from 'clsx';
import styles from '../JournalsSection.module.scss';
import { JournalData_Type } from '@/types/journal';
import { changeDateForm } from '@/utils/changeDate';

interface JournalListTable_Prop {
	contextJournal_List: JournalData_Type[];
	isContextJournalListLoading: boolean;
}
export default function JournalListTable({ contextJournal_List, isContextJournalListLoading }: JournalListTable_Prop) {
	return (
		<div className={clsx(styles.JournalTable)}>
			<table>
				<tbody>
					{isContextJournalListLoading ? (
						<tr>
							<td>Loading...</td>
						</tr> // 로딩 중임을 알리는 메시지
					) : contextJournal_List && contextJournal_List.length > 0 ? (
						contextJournal_List.map((item: JournalData_Type, index: number) => (
							<tr key={item.id + index}>
								<td>
									<div>
										<span>{item.title}</span>
									</div>
									<div className={clsx(styles.body)}>
										<span>{item.body}</span>
										<em>{changeDateForm(item.createdAt)}</em>
									</div>
								</td>
							</tr>
						))
					) : (
						<tr className={clsx(styles.noData)}>
							<td>작성된 Journal이 없습니다. 위의 칸을 채워 Journal을 등록 해보세요!</td>
						</tr> // 데이터가 없음을 알리는 메시지
					)}
				</tbody>
			</table>
		</div>
	);
}
