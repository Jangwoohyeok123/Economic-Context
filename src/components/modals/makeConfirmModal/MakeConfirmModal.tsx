import clsx from 'clsx';
import styles from './MakeConfirmModal.module.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { roboto, poppins } from '@/pages/_app';
import checkingModalSizeAndModifyClassName from '@/utils/checkingModalSizeAndModifyClassName';
import { ModalProps } from '@/types/modalInterface';

/* 컴포넌트 설명 
	1. size prop 을 통해 modal size 제어권 생성 (o)
	2. make 버튼 누르면 db 에 context 생성 (x)
	3. ul list 는 fetching 한 데이터 꽂아넣기 (x)
*/

type desc = {
	interest: [];
	exchange: [];
	consume: [];
	production: [];
};

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
