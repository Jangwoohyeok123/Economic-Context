import clsx from 'clsx';
import { useState } from 'react';
import styled from 'styled-components';

const buttonSize = 50;
const paddingSize = 5;
interface Button_Props {
	$isOpen: boolean;
}

const Toolbar = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
`;
const Button = styled.button<Button_Props>`
	position: absolute;
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
	transform: translateY(${paddingSize}px) ${props => (props.$isOpen ? `!important` : '')};
	transition: 0.4s;
	&:nth-child(1) {
		z-index: 5;
	}
	&:nth-child(2) {
		transform: translateY(calc(-1 * (${buttonSize}px)));
		z-index: 4;
	}
	&:nth-child(3) {
		transform: translateY(calc(-1 * (${buttonSize}px * 2 + ${paddingSize}px)));
		z-index: 3;
	}
	&:nth-child(4) {
		transform: translateY(calc(-1 * (${buttonSize}px * 3 + ${paddingSize}px* 2)));
		z-index: 2;
	}
	&:nth-child(5) {
		transform: translateY(calc(-1 * (${buttonSize}px * 4 + ${paddingSize}px* 3)));
	}
`;
interface JournalToolbar_Props {
	isJournalOpen: boolean;
	setIsJournalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function JournalToolbar({ isJournalOpen, setIsJournalOpen }: JournalToolbar_Props) {
	const [isToolbarOpen, setIsToolbarOpen] = useState(false);
	const toggleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsToolbarOpen(prev => !prev);
	};
	const openJournalComponent = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log('2');
		setIsJournalOpen(prev => !prev);
	};
	const routeToJournalPage = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log('Journal페이지 이동');
	};
	return (
		<Toolbar>
			<Button $isOpen={isToolbarOpen} onClick={e => toggleOpen(e)}>
				{isToolbarOpen ? 'X' : '더보기'}
			</Button>
			<Button $isOpen={isToolbarOpen} onClick={e => openJournalComponent(e)}>
				{isJournalOpen ? '닫기' : '열기'}
			</Button>
			<Button $isOpen={isToolbarOpen} onClick={e => routeToJournalPage(e)}>
				크게보기
			</Button>
			<Button $isOpen={isToolbarOpen} onClick={() => console.log('화면 하단으로 위치변경')}>
				하단으로이동
			</Button>
			<Button $isOpen={isToolbarOpen} onClick={() => console.log('화면 우측으로 위치변경')}>
				우측으로이동
			</Button>
		</Toolbar>
	);
}
