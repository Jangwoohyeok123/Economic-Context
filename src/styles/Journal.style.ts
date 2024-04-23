import styled from 'styled-components';

interface Journal_Props {
	$type?: string;
}

export const JournalWrapper = styled.div`
	width: 100%;
	display: grid;
	align-items: stretch;
	gap: 12px 0;
`;

export const Journal = styled.div<Journal_Props>`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	.journalBox {
		${props => (props.$type === 'myContext' ? `width: 100%; border: 1px solid var(--chartHeaderColor);` : `width: 93%;`)}
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
			margin-bottom: 10px;
		}
		.icon {
			padding: 10px 20px;
		}
	}
`;

interface Dropdown_Props {
	$isDrop: boolean;
}

export const JournalFormWrap = styled.div`
	width: 100%;
	border-radius: 20px 20px 0 0;
`;

export const Form = styled.form`
	width: 100%;
	height: 40vh;
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
export const DropDownMenu = styled.div`
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
export const Dropdown = styled.ul<Dropdown_Props>`
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
