export interface MakeModalProps {
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
}

export interface ChartModalProps {
	isChartModalOpen: boolean;
	setIsChartModalOpen: (isModalOpen: boolean) => void;
	children?: React.ReactNode;
}
