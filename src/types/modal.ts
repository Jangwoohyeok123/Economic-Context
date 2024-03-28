import { FavoriteIndicatorWithIsActive_Type } from './favorite';

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
	activeIndicators: FavoriteIndicatorWithIsActive_Type[];
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
