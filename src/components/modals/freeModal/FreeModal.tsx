import clsx from 'clsx';
import styles from './FreeModal.module.scss';
import ReactDOM from 'react-dom';
import { FreeModalProps } from '@/types/modalInterface';

export default function FreeModal({ className, isModalOpen, setIsModalOpen, children }: FreeModalProps) {
	if (!isModalOpen) return null;

	return ReactDOM.createPortal(
		<>
			<div className={clsx(styles.Overlay)}></div>
			{children}
		</>,
		document.body
	);
}

// // Redux 상태 예시
// const mapStateToProps = (state) => ({
//   isModalOpen: state.modal.isModalOpen,
// });

// const mapDispatchToProps = (dispatch) => ({
//   setIsModalOpen: (isOpen) => dispatch(toggleModal(isOpen)),
// });

// // FreeModal 컴포넌트 사용
// <FreeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
//   {/* children */}
// </FreeModal>
