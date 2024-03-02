import clsx from 'clsx';
import styles from './Indicators.module.scss';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import MakeConfirmModal from '../modals/makeConfirmModal/MakeConfirmModal';

interface IndicatorsProps {
	// Categorys 는 API 가 완성되면 다시 타입 지정한다.
	Categorys: any;
	CategoryIndex: number;
	setCategoryIndex: Dispatch<SetStateAction<number>>;
}

export default function Indicators({ Categorys, CategoryIndex, setCategoryIndex }: IndicatorsProps) {
	const [isOpenConfirmContext, setIsOpenConfirmContext] = useState(false);

	return (
		<div className={clsx(styles.Indicators)}>
			<nav>
				{Categorys.map((category, idx) => {
					return (
						<button key={idx} onClick={() => setCategoryIndex(idx)} className={CategoryIndex === idx ? styles.on : ''}>
							{category.title}
						</button>
					);
				})}
			</nav>
			<form>
				{Categorys[CategoryIndex].clientCheckedData.map((clientData, idx) => {
					return (
						<IndicatorCard
							key={idx}
							title={clientData}
							leftButton={{
								handler: () => {
									console.log('checking');
								},
								desc: 'checked'
							}}
							rightButton={{ handler: () => {}, desc: 'delete' }}
							pageType={'dashboard'}
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

			<MakeConfirmModal isModalOpen={isOpenConfirmContext} setIsModalOpen={setIsOpenConfirmContext} size='big' />
		</div>
	);
}
