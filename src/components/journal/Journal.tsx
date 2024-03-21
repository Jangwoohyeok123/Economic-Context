import clsx from 'clsx';
import styles from './Journal.module.scss';
import { useState } from 'react';
import { Journal, JournalResponseData } from '@/types/userType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import const_queryKey from '@/const/queryKey';
import { addJournal, getJournal } from '@/backendApi/user';
import { useSelector } from 'react-redux';
import { Store } from '@/types/reduxType';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { CgCloseR } from 'react-icons/cg';

interface JournalProps {
	contextId: number;
}

export default function Journal({ contextId }: JournalProps) {
	const userId = useSelector((state: Store) => state.user.id);
	const [isWrite, setIsWrite] = useState(false);
	const queryClient = useQueryClient();

	const [journalDataParams, setJournalDataParams] = useState({ title: '', body: '' });

	const ToggleJournalFormButton = (e: React.FormEvent<HTMLSpanElement>) => {
		e.preventDefault();
		setIsWrite(prev => !prev);
	};
	const ChangeJournalInputData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		const { name, value } = e.target; // e.target에서 name과 value를 추출
		const newParams: Journal = {
			...journalDataParams,
			[name]: value
		};
		setJournalDataParams(newParams);
	};
	const registJournal = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		makeJournal();
	};
	const addJournalMutation = useMutation({
		mutationFn: ({
			userId,
			contextId,
			journalDataParams
		}: {
			userId: number;
			contextId: number;
			journalDataParams: Journal;
		}) => addJournal(userId, contextId, journalDataParams),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [const_queryKey.journal, contextId]
			});

			alert('add 성공');
		},
		onError(error) {
			console.error(error);
		}
	});
	const makeJournal = () => {
		if (journalDataParams.body) {
			addJournalMutation.mutate({ userId, contextId, journalDataParams });
		} else {
			alert('모두 작성해주세요.');
		}

		setIsWrite(false);
	};

	const { data: journal, isLoading: isJournalLoading } = useQuery({
		queryKey: [const_queryKey.journal, contextId],
		queryFn: () => getJournal(contextId as number)
	});
	return (
		<div className={clsx(styles.Journal)}>
			<section className={clsx(styles.JournalHeader)}>
				<h3>Journal</h3>
				<span className={clsx(styles.JournalFormIcon)} onClick={e => ToggleJournalFormButton(e)}>
					{isWrite ? <CgCloseR /> : <HiMiniPencilSquare />}
				</span>
			</section>

			{isWrite && (
				<form onSubmit={registJournal}>
					<input type='text' name='title' onChange={e => ChangeJournalInputData(e)} />
					<textarea name='body' rows={5} onChange={e => ChangeJournalInputData(e)} />
					<div>
						<button>등록</button>
					</div>
				</form>
			)}
			<div className={clsx(styles.JournalTable)}>
				<table>
					<tbody>
						{journal?.map((item: JournalResponseData, index: number) => (
							<tr key={item.id + index}>
								{/* 메모 */}
								<td>
									<div>
										<span>{item.title}</span>
									</div>
									<div className={clsx(styles.description)}>
										<span>{item.body}</span>
										<em>{item.createdAt}</em>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
