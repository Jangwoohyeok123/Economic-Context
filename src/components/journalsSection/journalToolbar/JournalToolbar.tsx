import clsx from 'clsx';
import { useState } from 'react';
import styled from 'styled-components';

const buttonSize = 50;
const Toolbar = styled.div`
	padding: 5px;
	border-radius: 50px;
	display: flex;
	flex-direction: column-reverse;
	justify-content: center;
	align-items: center;
	gap: 5px;
	&.isOpen {
	}
`;
const Button = styled.button`
	display: block;
	width: ${buttonSize}px;
	height: ${buttonSize}px;
	border-radius: calc(${buttonSize}px / 2);
	text-align: center;
	border: none;
	background-color: var(--fontColor);
	font-size: 0.7rem;
	color: var(--chartColor);
	cursor: pointer;
`;
interface JournalToolbar_Props {
	setIsJournalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function JournalToolbar({ setIsJournalOpen }: JournalToolbar_Props) {
	const [isToolbarOpen, setIsToolbarOpen] = useState(false);
	const toggleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsToolbarOpen(prev => !prev);
	};
	const openJournalComponent = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsJournalOpen(prev => !prev);
		console.log('Journal컴포넌트 열기');
	};
	const routeToJournalPage = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log('Journal페이지 이동');
	};
	return (
		<Toolbar className={clsx(isToolbarOpen ? 'isOpen' : '')}>
			<Button onClick={e => toggleOpen(e)}>{!isToolbarOpen ? '더보기' : '닫기'}</Button>
			<Button onClick={e => openJournalComponent(e)}>열기</Button>
			<Button onClick={e => routeToJournalPage(e)}>크게보기</Button>
			<Button onClick={() => console.log('화면 하단으로 위치변경')}>하단으로이동</Button>
			<Button onClick={() => console.log('화면 우측으로 위치변경')}>우측으로이동</Button>
		</Toolbar>
	);
}
