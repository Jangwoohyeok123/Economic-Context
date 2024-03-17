import clsx from 'clsx';
import styles from './BubblePopButton.module.scss';

interface BubblePopButtonProps {
	children?: React.ReactNode;
	className?: string;
	clickHandler: () => void;
}

export default function BubblePopButton({ children, className, clickHandler: onClick }: BubblePopButtonProps) {
	const bubblePop = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.stopPropagation();
	};

	return (
		<button
			className={(clsx(styles.BubblePopButton), className)}
			onClick={event => {
				bubblePop(event);
				onClick();
			}}>
			{children}
		</button>
	);
}
