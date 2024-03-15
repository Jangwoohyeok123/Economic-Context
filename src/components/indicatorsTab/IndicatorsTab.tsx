import clsx from 'clsx';
import styles from './IndicatorsTab.module.scss';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';

interface IndicatorsProps {
	// Categorys 는 API 가 완성되면 다시 타입 지정한다.
	categorys: any;
	categoryIndex: number;
	setCategoryIndex: Dispatch<SetStateAction<number>>;
}

export default function IndicatorsTab({ categorys, categoryIndex, setCategoryIndex }: IndicatorsProps) {
	const [isOpenConfirmContext, setIsOpenConfirmContext] = useState(false);

	return (
		<div className={clsx(styles.IndicatorsTab)}>
			<nav>
				{categorys.map((category, idx) => {
					return (
						<button key={idx} onClick={() => setCategoryIndex(idx)} className={categoryIndex === idx ? styles.on : ''}>
							{category.title}
						</button>
					);
				})}
			</nav>
			<form>
				{categorys[categoryIndex].clientCheckedData.map((clientData, idx) => {
					return (
						<IndicatorCard
							key={idx}
							title={'hello'}
							leftButtonContent='delete'
							leftButtonHandler={() => alert('삭제')}
							rightButtonContent='checking'
							rightButtonHandler={() => console.log('save')}
							pageType='dashboard'
						/>
					);
				})}
			</form>
			<footer>
				<span className={clsx(styles.item)}></span>
				<div className={clsx(styles.pagination, styles.item)}>- 1 -</div>
				<div className={clsx(styles.item, styles.buttonWrap)}>
					<button
						onClick={() => {
							setIsOpenConfirmContext(true);
						}}>
						Make Context
					</button>
				</div>
			</footer>
		</div>
	);
}
