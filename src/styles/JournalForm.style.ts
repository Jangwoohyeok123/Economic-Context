import styled from 'styled-components';

interface ToggleButton_Props {
	$isJournalOpen: boolean;
}
interface Dropdown_Props {
	$isDrop: boolean;
}
export const JournalFormWrap = styled.div`
	width: 100%;
	border-radius: 20px 20px 0 0;
`;
export const Header = styled.div`
	background-color: var(--bgColor-dark);
	border-radius: 20px 20px 0 0;
	padding: 13px 15px;
`;
export const ToggleButton = styled.span<ToggleButton_Props>`
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
interface Form_Props {
	$isRight: boolean;
}
export const Form = styled.form<Form_Props>`
	width: 100%;
	height: ${props => (props.$isRight ? `100vh` : `40vh`)};
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
