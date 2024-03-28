import { addJournal } from '@/api/journal';
import const_queryKey from '@/const/queryKey';
import { JournalParams_Type } from '@/types/journal';
import { Store_Type } from '@/types/redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';

interface JournalWrite_Props {
	contextId: number;
	setIsWrite: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JournalWrite({ contextId, setIsWrite }: JournalWrite_Props) {
	const userId = useSelector((state: Store_Type) => state.user.id);
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
			journalDataParams: JournalParams_Type;
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

	const requestAddJournal = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (journalDataParams.body) {
			addJournalMutation.mutate({ userId, contextId, journalDataParams });
			setIsWrite(false);
		} else {
			alert('모두 작성해주세요.');
		}
	};
	const changeJournalInputData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		const { name, value } = e.target; // e.target에서 name과 value를 추출
		const newParams: JournalParams_Type = {
			...journalDataParams,
			[name]: value
		};
		setJournalDataParams(newParams);
	};
	return (
		<form onSubmit={requestAddJournal}>
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
	);
}
