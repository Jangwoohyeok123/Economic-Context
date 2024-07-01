import { MdExpandMore } from 'react-icons/md';
import styled from 'styled-components';

const AccordionContainer = styled.div`
	position: absolute;
	right: 0;
	top: 5px;
	width: 100px;
	height: 30px;
	border: 1px solid var(--bgColor2);
	border-radius: 10px;
	cursor: pointer;
	transition: 0.3s;

	> .label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
		width: 100%;
		height: 30px;
	}

	> .labelAccordion.active {
		background: #fff;
		height: 100px;

		&:hover {
			background: var(--bgColor2);
		}
	}
`;

export default function Accordion() {
	return (
		<AccordionContainer className='labelAccordion active'>
			<div className='label'>
				<span>Label</span>
				<span>
					<MdExpandMore />
				</span>
			</div>
		</AccordionContainer>
	);
}
