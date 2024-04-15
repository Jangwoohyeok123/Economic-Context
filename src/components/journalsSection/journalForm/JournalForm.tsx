import { addJournal } from '@/api/journal';
import const_queryKey from '@/const/queryKey';
import { JournalParams_Type } from '@/types/journal';
import { Store_Type } from '@/types/redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getContextNameWithKey_List } from '@/api/context';
import { ContextNameWithKey_Type } from '@/types/context';
import { motion } from 'framer-motion';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import * as S from '@/styles/JournalForm.style';

interface JournalForm_Props {
	currentContext: ContextNameWithKey_Type; //Dashboard page에서 현재 context data가져오기
	isRight: boolean; //journalForm의 위치가 오른쪽인지 boolean
	isJournalOpen: boolean; //journal작성을 위해 journalForm을 열었는지 boolean
	setIsJournalOpen: React.Dispatch<React.SetStateAction<boolean>>; //Dashboard page에 위치한 journal의 열고 닫음을 제어하는 툴바에게 전달할 boolean
}
export default function JournalForm({ currentContext, isRight, isJournalOpen, setIsJournalOpen }: JournalForm_Props) {
	const userId = useSelector((state: Store_Type) => state.user.id);
	const [journalDataParams, setJournalDataParams] = useState({ title: '', body: '' });
	const [isDrop, setIsDrop] = useState(false); //드롭다운 박스가 열리면 true
	const [toggleButtonText, setToggleButtonText] = useState<string>(currentContext.name); //드롭다운 박스에 선택된 context name
	const [contextId, setContextId] = useState(currentContext.id); //드롭박스 초기값은 Dashboard page에서 가져온 context.id
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
		} else {
			alert('모두 작성해주세요.');
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
			setContextId(context.id);
			setToggleButtonText(context.name);
			setIsDrop(false);
		} else {
			setToggleButtonText('전체');
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
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.2 } }}
			exit={{ opacity: 1, transition: { delay: 0.1, duration: 0.2 } }}>
			<motion.div initial={{ y: '100% ' }} animate={{ y: '0%', transition: { duration: 0.2 } }} exit={{ y: '100%', transition: { duration: 0.2 } }}>
				<S.JournalFormWrap>
					<S.Header>
						<S.ToggleButton $isJournalOpen={isJournalOpen}>
							투자 일지
							<span onClick={() => setIsJournalOpen(false)}>
								<BsChevronDown />
							</span>
						</S.ToggleButton>
					</S.Header>
					<S.Form onSubmit={requestAddJournal} $isRight={isRight}>
						<label>Context</label>
						<S.DropDownMenu tabIndex={0} onBlur={e => blurDropdown(e)}>
							<span className='dropdown' onClick={e => toggleDropBox(e)}>
								{toggleButtonText}
								{isDrop ? <BsChevronUp /> : <BsChevronDown />}
							</span>
							{!isLoading && isDrop && (
								<S.Dropdown $isDrop={isDrop}>
									<li onClick={e => changeJournalInputData(e, { name: '전체', id: 0 })}>{'전체'}</li>
									{contextIdsWithNames?.map((context: ContextNameWithKey_Type, index: number) => {
										const { id, name } = context;

										return (
											<li key={index} onClick={e => changeJournalInputData(e, context)}>
												{name}
											</li>
										);
									})}
								</S.Dropdown>
							)}
						</S.DropDownMenu>
						<label htmlFor='title'>Title</label>
						<input type='text' name='title' placeholder='Journal의 제목을 작성해주세요.' onChange={e => changeJournalInputData(e)} />
						<label htmlFor='body'>Body</label>
						<textarea name='body' rows={5} placeholder='Journal의 본문을 작성해주세요.' onChange={e => changeJournalInputData(e)} />
						<div>
							<button>등록</button>
						</div>
					</S.Form>
				</S.JournalFormWrap>
			</motion.div>
		</motion.div>
	);
}
