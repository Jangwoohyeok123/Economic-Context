import clsx from 'clsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { roboto, poppins } from '@/pages/_app';
import styles from './MakeConfirmModal.module.scss';
import { MakeModalProps } from '@/types/modalInterface';
import checkingModalSizeAndModifyClassName from '@/utils/checkingModalSizeAndModifyClassName';

type desc = {
	interest: [];
	exchange: [];
	consume: [];
	production: [];
};

export default function MakeConfirmModal({ isModalOpen, setIsModalOpen, children, size }: MakeModalProps) {
	const ModalClassName = checkingModalSizeAndModifyClassName(size);

	return isModalOpen
		? ReactDOM.createPortal(
				<React.Fragment>
					<div className={clsx(styles.Overlay)}></div>
					<div className={clsx(styles[ModalClassName], roboto.variable, poppins.variable)}>
						<div className={clsx(styles.header)}>
							<h3>Create Context</h3>
							<span>Make your custom context</span>
						</div>
						<div className={clsx(styles.name)}>
							<h5>Name</h5>
							<input type='text' placeholder='Name of your context' />
						</div>
						<div className={clsx(styles.selectedIndicators)}>
							<h5>Indicators</h5>
							{/* fetching 한 이후 list 를 꽂아넣을 것 */}
							<ul className={clsx(styles.selectedIndicators)}>
								<li>Interest: {7}개의 지표들</li>
								<li>Exchange: {7}개의 지표들</li>
								<li>Consume: {7}개의 지표들</li>
								<li>Production: {7}개의 지표들</li>
							</ul>
						</div>
						<div className={clsx(styles.buttons)}>
							<button className={clsx(styles.leftButton)} onClick={() => setIsModalOpen(false)}>
								Cancel
							</button>
							<button className={clsx(styles.rightButton)} onClick={() => {}}>
								Make
							</button>
						</div>
					</div>
				</React.Fragment>,
				document.body
		  )
		: null;
}
