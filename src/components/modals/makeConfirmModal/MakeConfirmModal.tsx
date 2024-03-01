import clsx from 'clsx';
import styles from './MakeConfirmModal.module.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { roboto, poppins } from '@/pages';
import checkingModalSizeAndModifyClassName from '@/utils/checkingModalSizeAndModifyClassName';
import { ModalProps } from '@/types/modalInterface';

type desc = {
	interest: [];
	exchange: [];
	consume: [];
	production: [];
};

function checkingModalTypeAndModifyClassName(type: string) {
	let className = 'defaultClassName';
	if (type === 'small') {
		className = 'SmallModal';
	} else if (type === 'big') {
		className = 'BigModal';
	}

	return className;
}

export default function MakeConfirmModal({ isModalOpen, setIsModalOpen, children, size }: ModalProps) {
	const ModalClassName = checkingModalSizeAndModifyClassName(size);

	const createContext = () => {
		console.log('아래의 틀로 context 를 만듦');
		console.log('{contextName, interest: [], exchange: [], ...posts: 빈배열}');
	};

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
							<ul className={clsx(styles.selectedIndicators)}>
								<li>Interest: {desc?.interest.length}개의 지표들</li>
								<li>Exchange: {desc?.exchange.length}개의 지표들</li>
								<li>Consume: {desc?.consume.length}개의 지표들</li>
								<li>Production: {desc?.production.length}개의 지표들</li>
							</ul>
						</div>
						<div className={clsx(styles.buttons)}>
							<button className={clsx(styles.leftButton)} onClick={() => setIsModalOpen(false)}>
								Cancel
							</button>
							<button className={clsx(styles.rightButton)} onClick={createContext}>
								Make
							</button>
						</div>
					</div>
				</React.Fragment>,
				document.body
		  )
		: null;
}
