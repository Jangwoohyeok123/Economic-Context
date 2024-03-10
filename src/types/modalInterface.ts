import { ActiveIndicators } from '@/components/indicators/Indicators';

export interface FreeModalProps {
	className: string;
	isModalOpen: boolean;
	setIsModalOpen: (isOpen: boolean) => void;
	children: React.ReactNode;
}

export interface MakeModalProps {
	isModalOpen: boolean;
	setIsModalOpen: (isModalOpen: boolean) => void;
	children?: React.ReactNode;
	size: string;
	activeIndicators: ActiveIndicators;
}

export interface ChartModalProps {
	isChartModalOpen: boolean;
	setIsChartModalOpen: (isModalOpen: boolean) => void;
	children?: React.ReactNode;
}

export interface AlertModalProps {
	isModalOpen: boolean;
	setIsModalOpen: (isModalOpen: boolean) => void;
	size: string;
	header: string;
	body: string;
	leftButtonContent: string;
	leftButtonHandler: () => void;
	rightButtonContent: string;
	rightButtonHandler: () => void;
}
