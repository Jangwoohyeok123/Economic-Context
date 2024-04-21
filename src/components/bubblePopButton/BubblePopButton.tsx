import styled from 'styled-components';

interface BubblePopButton_Props {
	children?: React.ReactNode;
	className?: string;
	clickHandler: () => void;
}

const Button = styled.button`
	border: none;
	background: #fff;
	width: 100%;
	height: 100%;
`;

export default function BubblePopButton({ children, className, clickHandler: onClick }: BubblePopButton_Props) {
	const bubblePop = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.stopPropagation();
	};

	return (
		<Button
			className={className}
			onClick={event => {
				bubblePop(event);
				onClick();
			}}>
			{children}
		</Button>
	);
}
