import clsx from 'clsx';
import styles from './AlertModal.module.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { roboto, poppins } from '@/pages/_app';
import { ModalProps } from '@/types/modal';
import checkingModalSizeAndModifyClassName from '@/utils/checkingModalSizeAndModifyClassName';
import { useDispatch } from 'react-redux';
import { toggleLoginModal } from '@/actions/actions';

export default function LoginAlertModal({
	isModalOpen,
	size, // union type
	header,
	body,
	rightButtonHandler
}: ModalProps) {
	const ModalClassName = checkingModalSizeAndModifyClassName(size);
	const dispatch = useDispatch();

	return isModalOpen
		? ReactDOM.createPortal(
				<React.Fragment>
					<div className={clsx(styles.Overlay)}></div>
					<div className={clsx(styles[ModalClassName], roboto.variable, poppins.variable)}>
						<div className={clsx(styles.modalWrap)}>
							<div className={clsx(styles.content)}>
								<h3>{header}</h3>
								<div className={clsx(styles.modalBody)}>{body}</div>
							</div>
							<div className={clsx(styles.buttons)}>
								<button className={clsx(styles.leftButton)} onClick={() => dispatch(toggleLoginModal())}>
									Go Back
								</button>
								<button className={clsx(styles.rightButton)} onClick={rightButtonHandler}>
									Login
								</button>
							</div>
						</div>
					</div>
				</React.Fragment>,
				document.body
		  )
		: null;
}
