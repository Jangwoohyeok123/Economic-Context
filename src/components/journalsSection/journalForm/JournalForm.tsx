import { addJournal } from '@/api/journal';
import const_queryKey from '@/const/queryKey';
import { JournalParams_Type } from '@/types/journal';
import { Store_Type } from '@/types/redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface JournalForm_Props {
	contextId: number;
	setIsWrite: boolean;
}

const Form = styled.form`
	width: 100%;
	height: 500px;
	background-color: var(--bgColor-light);
	border-radius: 20px 20px 0 0;
	padding: 20px;
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
`;

export default function JournalForm({ contextId, setIsWrite }: JournalForm_Props) {
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
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.2 } }}
			exit={{ opacity: 0, transition: { delay: 0.1, duration: 0.2 } }}>
			<motion.div
				initial={{ y: '100% ' }}
				animate={{ y: '0%', transition: { duration: 0.2 } }}
				exit={{ y: '100%', transition: { duration: 0.2 } }}>
				<Form onSubmit={requestAddJournal}>
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
			</motion.div>
		</motion.div>
	);
}
