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
	title: string;
	seriesId: string;
	isModalOpen: boolean;
	setIsModalOpen: (isModalOpen: boolean) => void;
	children?: React.ReactNode;
}
