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
	size,
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
						<h3>{header}</h3>
						<div>{body}</div>
						<div>
							<button onClick={leftButtonHandler}>{leftButtonContent}</button>
							<button onClick={rightButtonHandler}>{rightButtonContent}</button>
						</div>
					</div>
				</React.Fragment>,
				document.body
		  )
		: null;
}
