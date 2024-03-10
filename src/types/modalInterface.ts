export type ModalProps = {
	isModalOpen: boolean;
	setIsModalOpen: (isModalOpen: boolean) => void;
	size: string;
	children?: React.ReactNode;
	header: string;
	body: string;
	leftButtonContent: string;
	leftButtonHandler: () => void;
	rightButtonContent: string;
	rightButtonHandler: () => void;
};
// isChartModalOpen, setIsChartModalOpen, children
export type ChartModalProps = {
	isChartModalOpen: boolean;
	setIsChartModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children?: React.ReactNode;
};
