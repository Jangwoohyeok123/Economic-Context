import { addJournal } from '@/api/journal';
import const_queryKey from '@/const/queryKey';
import { JournalParams_Type } from '@/types/journal';
import { Store_Type } from '@/types/redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getContextNameWithKey_List } from '@/api/context';
import { ContextNameWithKey_Type } from '@/types/context';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

interface ToggleButton_Props {
	$isJournalOpen: boolean;
}
interface Dropdown_Props {
	$isDrop: boolean;
}
const JournalFormWrap = styled.div`
	width: 100%;
	border-radius: 20px 20px 0 0;
`;
const Header = styled.div`
	background-color: var(--bgColor-dark);
	border-radius: 20px 20px 0 0;
	padding: 13px 15px;
`;
const ToggleButton = styled.span<ToggleButton_Props>`
	display: flex;
	justify-content: space-between;
	color: var(--bgColor);
	> span {
		margin-bottom: -5px;
		transition: 0.3s;
		transform: ${props => (props.$isJournalOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
		cursor: pointer;
		svg {
			color: var(--pointColor);
			font-size: 1.4rem;
		}
		&:hover {
			transform: translateY(5px) ${props => (props.$isJournalOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
			svg {
				color: var(--bgColor);
			}
		}
	}
`;

const Form = styled.form`
	width: 100%;
	height: 50vh;
	overflow-y: scroll;
	padding: 40px 20px;
	background-color: var(--bgColor-light);
	input,
	textarea {
		display: block;
		width: 100%;
		resize: none;
		outline: 0;
		margin-bottom: 10px;
		background: var(--bgColor-light);
		box-shadow: 5px 5px 20px rgba(var(--fontColor-code), 0.1);
		border: none;
		padding: 5px;
		&::placeholder {
			padding: 10px;
			font-size: 0.8rem;
			color: rgba(var(--fontColor-code), 0.4);
			font-family: var(--baseFont);
		}
	}
	label {
		display: block;
		font-size: 1.1rem;
		font-weight: 500;
		color: var(--fontColor);
		padding: 0 10px 5px;
	}
	input {
		height: 30px;
		margin-bottom: 30px;
	}
	textarea {
		height: 200px;
		margin-bottom: 50px;
	}
	> div {
		text-align: right;
	}
	button {
		padding: 8px 10px;
		font-size: 0.8rem;
		color: var(--bgColor);
		background: var(--fontColor);
		border: none;
		cursor: pointer;
	}
	&::-webkit-scrollbar-track {
		background-color: var(--bgColor-light);
		border-radius: 10px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(var(--fontColor-code), 0.6);
		border-radius: 10px;
		border: 3px solid var(--bgColor-light);
	}

	&::-webkit-scrollbar {
		width: 12px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background-color: var(--fontColor);
	}
`;
const DropDownMenu = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 30px;
	position: relative;
	> .dropdown {
		width: 50%;
		height: 40px;
		border: 1px solid #eee;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1.1rem;
		font-weight: 500;
		color: var(--fontColor);
		cursor: pointer;
		padding: 5px 10px;
		box-shadow: 5px 5px 20px rgba(var(--fontColor-code), 0.1);
	}
`;
const Dropdown = styled.ul<Dropdown_Props>`
	position: absolute;
	left: 0;
	top: 40px;
	width: 50%;
	z-index: 5;
	display: ${props => (props.$isDrop ? 'flex' : 'none')};
	flex-direction: column;
	word-break: keep-all;
	transition: 0.3s;
	box-shadow: 5px 5px 20px rgba(var(--fontColor-code), 0.1);
	> li {
		text-align: center;
		padding: 5px 0;
		transition: 0.3s;
		background-color: var(--bgColor-light);
		&:hover {
			background-color: var(--chartColor);
		}
	}
`;

interface JournalForm_Props {
	contextId: number;
	setIsWrite: boolean;
	isJournalOpen: boolean;
	setIsJournalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JournalForm({ contextId, setIsWrite, isJournalOpen, setIsJournalOpen }: JournalForm_Props) {
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
			// setIsWrite(false);
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
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.2 } }}
			exit={{ opacity: 1, transition: { delay: 0.1, duration: 0.2 } }}>
			<motion.div
				initial={{ y: '100% ' }}
				animate={{ y: '0%', transition: { duration: 0.2 } }}
				exit={{ y: '100%', transition: { duration: 0.2 } }}>
				<JournalFormWrap>
					<Header>
						<ToggleButton $isJournalOpen={isJournalOpen}>
							투자 일지{' '}
							<span onClick={() => setIsJournalOpen(false)}>
								<BsChevronDown />
							</span>
						</ToggleButton>
					</Header>
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
					</Form>
				</JournalFormWrap>
			</motion.div>
		</motion.div>
	);
}
