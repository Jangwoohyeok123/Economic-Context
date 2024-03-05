import clsx from 'clsx';
import styles from './AlertModal.module.scss';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { roboto, poppins } from '@/pages';
import { ModalProps } from '@/types/modalInterface';
import checkingModalSizeAndModifyClassName from '@/utils/checkingModalSizeAndModifyClassName';

export default function AlertModal({
	isModalOpen,
	setIsModalOpen,
	size, // union type
	header,
	body,
	leftButtonContent,
	leftButtonHandler,
	rightButtonContent,
	rightButtonHandler
}: ModalProps) {
	const ModalClassName = checkingModalSizeAndModifyClassName(size);

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
								<button className={clsx(styles.leftButton)} onClick={leftButtonHandler}>
									{leftButtonContent}
								</button>
								<button className={clsx(styles.rightButton)} onClick={rightButtonHandler}>
									{rightButtonContent}
								</button>
							</div>
						</div>
					</div>
				</React.Fragment>,
				document.body
		  )
		: null;
}
