import clsx from 'clsx';
import styles from './AlertModal.module.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { roboto, poppins, frontUrl } from '@/pages/_app';
import { ModalProps } from '@/types/modal';
import checkingModalSizeAndModifyClassName from '@/utils/checkingModalSizeAndModifyClassName';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginModal } from '@/actions/actions';
import { Store_Type } from '@/types/redux';
import { Router, useRouter } from 'next/router';

export default function LoginAlertModal({
	size, // union type
	header,
	body
}: ModalProps) {
	const ModalClassName = checkingModalSizeAndModifyClassName(size);
	const dispatch = useDispatch();
	const isLoginAlertModalOpen = useSelector((state: Store_Type) => state.loginAlertModal.isLoginAlertModalOpen);
	const router = useRouter();

	return isLoginAlertModalOpen
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
								<button className={clsx(styles.rightButton)} onClick={() => router.push(`${frontUrl}/login`)}>
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
