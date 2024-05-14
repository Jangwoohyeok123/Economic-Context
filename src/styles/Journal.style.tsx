import styled from 'styled-components';

export const JournalWrapper = styled.div`
	width: 100%;
	display: grid;
	align-items: stretch;
	gap: 12px 0;
`;

interface Journal_Props {
	$type?: string;
}

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
export const JournalFormWrap = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	padding: 20px;
	gap: 10px;
	.formSection {
		width: 100%;
		h2 {
			padding: 7px 0 10px;
		}
	}
`;

export const Form = styled.form`
	width: 100%;

	.formHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 1px solid var(--chartHeaderColor);
		border-radius: 5px 5px 0 0;
		background-color: var(--bgColor);
		padding-right: 20px;
		> span {
			line-height: 50px;
			padding: 0 20px;
			background-color: var(--bgColor-light);
			border: 1px solid var(--chartHeaderColor);
			border-top: none;
			border-left: none;
			border-bottom: none;
			border-radius: 5px 5px 0 0;
			position: relative;
			&::after {
				position: absolute;
				content: '';
				display: block;
				width: 100%;
				height: 2px;
				left: 0;
				bottom: -1px;
				background-color: var(--bgColor-light);
			}
		}
	}
	.formBody {
		border: 1px solid var(--chartHeaderColor);
		border-top: none;
		border-radius: 0 0 5px 5px;
		margin-bottom: 20px;
		padding: 20px;
		> input,
		> textarea {
			display: block;
			width: 100%;
			resize: none;
			outline: 0;
			margin-bottom: 10px;
			background: var(--bgColor-light);
			border: 1px solid var(--chartHeaderColor);
			border-radius: 5px;
			padding: 10px;
			box-sizing: border-box;
			font-size: 0.8rem;
			&::placeholder {
				font-size: 0.8rem;
				color: rgba(var(--fontColor-code), 0.4);
				font-family: var(--baseFont);
			}
		}
		> label,
		.ql-picker-label {
			display: block;
			font-size: 0.9rem;
			font-weight: 200;
			color: var(--fontColor);
			padding: 0 10px 5px;
		}
		> input {
			height: 30px;
			margin-bottom: 30px;
			padding: 20px 10px;
		}
		> textarea {
			height: 200px;
		}
		.quill > .ql-container > .ql-editor.ql-blank::before {
			font-size: 0.8rem;
			color: rgba(var(--fontColor-code), 0.4);
			font-family: var(--baseFont);
			font-style: normal;
		}
		.quill > .ql-container > .ql-editor {
			color: var(--fontColor);
		}
		.ql-toolbar.ql-snow {
			width: 100%;
			display: flex;
			justify-content: flex-end;
			position: relative;
			padding-left: 160px;
		}

		.ql-snow .ql-picker {
			position: absolute;
			left: 5px;
			top: 50%;
			transform: translateY(-50%);
		}
		.ql-snow .ql-picker.ql-header {
			width: 160px;
			height: 30px;
		}
		.ql-toolbar.ql-snow .ql-picker .ql-picker-label {
			border: 1px solid var(--chartHeaderColor);
			border-radius: 5px;
			padding: 5px 10px;
		}
		.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
			width: 100%;
			border: 1px solid var(--chartHeaderColor);
			box-shadow: none;
		}
		.ql-snow .ql-picker-options .ql-picker-item {
			&:hover {
				color: var(--pointColor2);
			}
		}
	}
	.formButton {
		text-align: right;
		> button {
			padding: 8px 10px;
			font-size: 0.8rem;
			color: var(--bgColor);
			background: var(--fontColor);
			border: none;
			cursor: pointer;
		}
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
	width: 60px;
	display: flex;
	flex-direction: column;
	position: relative;
	> .dropdown {
		height: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1.1rem;
		font-weight: 500;
		color: var(--fontColor);
		cursor: pointer;
		padding: 0 5px;
		border: 1px solid var(--chartHeaderColor);
		border-radius: 5px;
		text-align: center;
		background: var(--bgColor-light);
		> em {
			display: flex;
			width: 100%;
			justify-content: center;
			align-items: center;
		}
	}
`;
interface Dropdown_Props {
	$isDrop: boolean;
}
export const Dropdown = styled.ul<Dropdown_Props>`
	position: absolute;
	left: 0;
	top: 40px;
	width: 100%;
	z-index: 5;
	display: ${props => (props.$isDrop ? 'flex' : 'none')};
	flex-direction: column;
	word-break: keep-all;
	transition: 0.3s;
	box-shadow: 5px 5px 20px rgba(var(--fontColor-code), 0.1);
	border: 1px solid var(--chartHeaderColor);
	border-radius: 5px;
	> li {
		text-align: center;
		border-radius: 5px;
		padding: 5px 0;
		transition: 0.3s;
		background-color: var(--bgColor-light);
		&:hover {
			background-color: var(--chartColor);
		}
	}
`;
