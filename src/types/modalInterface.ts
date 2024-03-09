import { ActiveIndicators } from '@/components/indicators/Indicators';

export interface MakeModalProps {
	isModalOpen: boolean;
	setIsModalOpen: (isModalOpen: boolean) => void;
	size: string;
	children?: React.ReactNode;
	activeIndicators: ActiveIndicators;
}

export interface ChartModalProps {
	isChartModalOpen: boolean;
	setIsChartModalOpen: (isModalOpen: boolean) => void;
	children?: React.ReactNode;
}
