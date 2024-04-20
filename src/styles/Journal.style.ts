import { red } from '@mui/material/colors';
import styled from 'styled-components';

interface Journal_Props {
	$type?: string;
}

export const JournalWrapper = styled.div``;

export const Journal = styled.div<Journal_Props>`
	display: flex;
	padding: 10px;
	justify-content: space-between;
	align-items: flex-start;
	.journalBox {
		${props => (props.$type === 'myContext' ? `width: 100%; border: 1px solid var(--chartHeaderColor);` : `width: 93%; border: 1px solid blue`)}
		border-radius:5px;
		header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: ${props => (props.$type === 'myContext' ? 'transparent' : `var(--chartHeaderColor)`)};
			padding: 10px 20px;
			position: relative;
			.headerData {
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 8px;
				> span {
					&.id {
						font-weight: 400;
						letter-spacing: -0.5px;
					}
					&.date {
						font-weight: 300;
						font-size: 0.8rem;
						color: rgba(var(--font-code), 0.5);
					}
				}
			}
			${props =>
				props.$type === 'myContext'
					? ''
					: `&::before {
				content: '';
				position: absolute;
				left: -9px;
				top: 16px;
				width: 0;
				height: 0;
				border-top: 8px solid transparent;
				border-bottom: 8px solid transparent;
				border-right: 10px solid var(--chartHeaderColor);
			}`};
		}
		.body {
			min-height: 100px;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			padding: 10px 20px;
		}
		.icon {
			padding: 10px 20px;
		}
	}
`;
