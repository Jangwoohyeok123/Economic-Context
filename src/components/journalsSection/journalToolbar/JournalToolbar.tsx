import clsx from 'clsx';
import { useState } from 'react';
import styled from 'styled-components';
import { BiSolidDockRight, BiSolidDockBottom, BiSolidArea } from 'react-icons/bi';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { BsChevronDown } from 'react-icons/bs';

const buttonSize = 50;
const paddingSize = 5;
interface Button_Props {
	children?: React.ReactNode;
	$isToolbarOpen?: boolean;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	$isJournalOpen?: boolean;
}

const Toolbar = styled.div`
	position: relative;
	display: flex;
	justify-content: flex-end;
`;
const Button = styled.span<Button_Props>`
	position: absolute;
	display: block;
	width: ${buttonSize}px;
	height: ${buttonSize}px;
	line-height: calc(${buttonSize}px + 5px);
	border-radius: calc(${buttonSize}px / 2);
	text-align: center;
	background-color: var(--fontColor);
	font-size: 0.7rem;
	color: var(--chartColor);
	cursor: pointer;
	transform: translateY(${paddingSize}px) ${props => (props.$isToolbarOpen ? '' : '!important')};
	transition: 0.4s;

	&:nth-child(1) {
		width: ${props => (!props.$isToolbarOpen ? `calc(${buttonSize}px * 2)` : `${buttonSize}px`)};
		span {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 0 5px;
			font-size: 0.9rem;
			height: ${buttonSize}px;
			svg {
				margin-top: ${props => (!props.$isToolbarOpen ? `-6px` : `0`)};
				font-size: 1.2rem;
			}
		}
	}
	&:nth-child(3),
	&:nth-child(4),
	&:nth-child(5) {
		line-height: calc(${buttonSize}px + 7px);
		transform: ${props => {
			if (props.$isToolbarOpen && props.$isJournalOpen) {
				return '';
			} else if (props.$isToolbarOpen && !props.$isJournalOpen) {
				return `translateY(calc(-1 * (${buttonSize}px))) !important`;
			} else if (!props.$isToolbarOpen && !props.$isJournalOpen) {
				return `translateY(${paddingSize}px) !important`;
			}
		}};
	}
	&:nth-child(3)::after,
	&:nth-child(4)::after,
	&:nth-child(5)::after {
		position: absolute;
		content: '';
		width: 90px;
		right: 0;
		top: 50%;
		text-align: right;
		transform: translateY(-50%);
		visibility: hidden;
		transition: opacity ease 0.3s;
		color: var(--fontColor);
		opacity: 0;
	}
	&:nth-child(3):hover::after,
	&:nth-child(4):hover::after,
	&:nth-child(5):hover::after {
		right: calc(${buttonSize}px + 10px);
		opacity: 1;
		visibility: visible;
	}
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
		&::after {
			content: '일지페이지 이동';
		}
	}
	&:nth-child(4) {
		transform: translateY(calc(-1 * (${buttonSize}px * 3 + ${paddingSize}px* 2)));
		z-index: 2;
		&::after {
			content: '하단으로 이동';
		}
	}
	&:nth-child(5) {
		transform: translateY(calc(-1 * (${buttonSize}px * 4 + ${paddingSize}px* 3)));
		&::after {
			content: '우측으로 이동';
		}
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
		let newValue = !isToolbarOpen;
		setIsToolbarOpen(newValue);
		newValue ? setIsJournalOpen(true) : setIsJournalOpen(false);
		//TODO::Toolbar 닫을 때 JournalForm에 입력한 데이터가 있으면, confirm으로 확인일때만 journal같이 닫히도록.
	};
	const openJournalComponent = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		setIsJournalOpen(prev => !prev);
	};
	const routeToJournalPage = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log('Journal페이지 이동');
	};
	return (
		<Toolbar>
			<Button $isToolbarOpen={isToolbarOpen} onClick={e => toggleOpen(e)}>
				{isToolbarOpen ? (
					<span>
						<BsChevronDown />
					</span>
				) : (
					<span>
						<HiMiniPencilSquare />
						작성하기
					</span>
				)}
			</Button>
			<Button $isToolbarOpen={isToolbarOpen} onClick={e => openJournalComponent(e)}>
				{isJournalOpen ? '닫기' : '열기'}
			</Button>
			<Button $isToolbarOpen={isToolbarOpen} $isJournalOpen={isJournalOpen} onClick={e => routeToJournalPage(e)}>
				<BiSolidArea />
			</Button>
			<Button
				$isToolbarOpen={isToolbarOpen}
				$isJournalOpen={isJournalOpen}
				onClick={() => console.log('화면 하단으로 위치변경')}>
				<BiSolidDockBottom />
			</Button>
			<Button
				$isToolbarOpen={isToolbarOpen}
				$isJournalOpen={isJournalOpen}
				onClick={() => console.log('화면 우측으로 위치변경')}>
				<BiSolidDockRight />
			</Button>
		</Toolbar>
	);
}
