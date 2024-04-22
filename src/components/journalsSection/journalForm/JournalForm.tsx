import { addJournal } from '@/api/journal';
import const_queryKey from '@/const/queryKey';
import { JournalParams_Type } from '@/types/journal';
import { Store_Type } from '@/types/redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getContextNameWithKey_List } from '@/api/context';
import { ContextNameWithKey_Type } from '@/types/context';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { DropDownMenu, Dropdown, Form, JournalFormWrap } from '@/styles/Journal.style';

interface JournalForm_Props {
	contextId: number;
	setIsWrite: boolean;
	isRight: boolean;
	isJournalOpen: boolean;
	setIsJournalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JournalForm({ contextId, setIsWrite, isRight, isJournalOpen, setIsJournalOpen }: JournalForm_Props) {
	const userId = useSelector((state: Store_Type) => state.user.id);
	const [journalDataParams, setJournalDataParams] = useState({ contextId: 0, title: '', body: '' });
	const [isDrop, setIsDrop] = useState(false);
	const [toggleButtonText, setTogglebuttonText] = useState('전체');
	const queryClient = useQueryClient();

	const { data: contextIdsWithNames, isLoading } = useQuery<ContextNameWithKey_Type[]>({
		queryKey: [const_queryKey.context, 'names'],
		queryFn: () => getContextNameWithKey_List(userId)
	});

	const addJournalMutation = useMutation({
		mutationFn: ({ userId, contextId, journalDataParams }: { userId: number; contextId: number; journalDataParams: JournalParams_Type }) =>
			addJournal(userId, contextId, journalDataParams),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [const_queryKey.journal, contextId]
			});
		},
		onError(error) {
			console.error(error);
		}
	});

	const requestAddJournal = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (journalDataParams.body) {
			addJournalMutation.mutate({ userId, contextId, journalDataParams });
			// setIsWrite(false);
		} else {
			// alert('모두 작성해주세요.');
		}
	};
	interface ContextType {
		id: number;
		name: string;
	}
	const changeJournalInputData = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLLIElement>,
		context?: ContextType
	) => {
		e.preventDefault();
		let newParams = { ...journalDataParams };
		const target = e.target as HTMLInputElement | HTMLTextAreaElement;
		if (target.value) {
			const { name, value } = target; // e.target에서 name과 value를 추출
			newParams = {
				...journalDataParams,
				[name]: value
			};
			setJournalDataParams(newParams);
		} else if (context?.id && context.id !== 0) {
			newParams = {
				...journalDataParams,
				contextId: context.id
			};
			setTogglebuttonText(context.name);
			setIsDrop(false);
			setJournalDataParams(newParams);
		} else {
			setTogglebuttonText('전체');
			setIsDrop(false);
		}
	};
	const toggleDropBox = (e: React.FormEvent<HTMLSpanElement>) => {
		e.preventDefault();
		setIsDrop(prev => !prev);
	};
	const blurDropdown = (e: React.FormEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setIsDrop(false);
	};
	return (
		<JournalFormWrap>
			<Form onSubmit={requestAddJournal}>
				<label>Context</label>
				<DropDownMenu tabIndex={0} onBlur={e => blurDropdown(e)}>
					<span className='dropdown' onClick={e => toggleDropBox(e)}>
						{toggleButtonText}
						{isDrop ? <BsChevronUp /> : <BsChevronDown />}
					</span>
					{!isLoading && isDrop && (
						<Dropdown $isDrop={isDrop}>
							<li onClick={e => changeJournalInputData(e, { name: '전체', id: 0 })}>{'전체'}</li>
							{contextIdsWithNames?.map((context: ContextNameWithKey_Type, index: number) => {
								const { id, name } = context;

								return (
									<li key={index} onClick={e => changeJournalInputData(e, context)}>
										{name}
									</li>
								);
							})}
						</Dropdown>
					)}
				</DropDownMenu>
				<label htmlFor='title'>Title</label>
				<input type='text' name='title' placeholder='Journal의 제목을 작성해주세요.' onChange={e => changeJournalInputData(e)} />
				<label htmlFor='body'>Body</label>
				<textarea name='body' rows={5} placeholder='Journal의 본문을 작성해주세요.' onChange={e => changeJournalInputData(e)} />
				<div>
					<button>등록</button>
				</div>
			</Form>
		</JournalFormWrap>
	);
}
