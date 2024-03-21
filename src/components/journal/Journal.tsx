import clsx from 'clsx';
import styles from './Journal.module.scss';
import { useEffect, useState } from 'react';
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
	const [journalDataParams, setJournalDataParams] = useState({ title: '', body: '' });
	const queryClient = useQueryClient();

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

	const toggleJournalFormButton = (e: React.FormEvent<HTMLSpanElement>) => {
		e.preventDefault();
		setIsWrite(prev => !prev);
	};

	const changeJournalInputData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
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
	useEffect(() => {
		// journal 데이터가 있고 항목이 하나 이상 있는 경우 isOpen을 true로 설정
		if (journal && journal.length > 0) {
			setIsWrite(false);
		} else {
			setIsWrite(true); // 그렇지 않으면 false로 설정
		}
	}, [journal]);

	return (
		<div className={clsx(styles.Journal)}>
			<section className={clsx(styles.JournalHeader)}>
				<h3>Journal</h3>
				<span className={clsx(styles.JournalFormIcon)} onClick={e => toggleJournalFormButton(e)}>
					{isWrite ? <CgCloseR /> : <HiMiniPencilSquare />}
				</span>
			</section>

			{isWrite && (
				<form onSubmit={registJournal}>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						name='title'
						placeholder='Journal의 제목을 작성해주세요.'
						onChange={e => changeJournalInputData(e)}
					/>
					<label htmlFor='body'>Body</label>
					<textarea
						name='body'
						rows={5}
						placeholder='Journal의 본문을 작성해주세요.'
						onChange={e => changeJournalInputData(e)}
					/>
					<div>
						<button>등록</button>
					</div>
				</form>
			)}
			<div className={clsx(styles.JournalTable)}>
				<table>
					<tbody>
						{isJournalLoading ? (
							<div>Loading...</div> // 로딩 중임을 알리는 메시지
						) : journal && journal.length > 0 ? (
							journal.map((item: JournalResponseData, index: number) => (
								<tr key={item.id + index}>
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
							))
						) : (
							<div className={clsx(styles.noData)}>
								작성된 Journal이 없습니다. 위의 칸을 채워 Journal을 등록 해보세요!
							</div> // 데이터가 없음을 알리는 메시지
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
