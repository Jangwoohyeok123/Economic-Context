import clsx from 'clsx';
import FreeModal from '../freeModal/FreeModal';
import styles from './validationModal.module.scss';
import { poppins, roboto } from '@/pages/_app';

interface ValidateNameModalProps {
	isValidationModalOpen: boolean;
	setIsValidationModalOpen: (isModalOpen: boolean) => void;
	children: React.ReactNode;
}

export default function ValidateNameModal({
	isValidationModalOpen: isModalOpen,
	setIsValidationModalOpen: setIsModalOpen,
	children
}: ValidateNameModalProps) {
	return (
		<FreeModal
			className={clsx(poppins.variable, roboto.variable)}
			isModalOpen={isModalOpen}
			setIsModalOpen={setIsModalOpen}>
			{children}
		</FreeModal>
	);
}
