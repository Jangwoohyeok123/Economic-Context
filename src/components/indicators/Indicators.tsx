import clsx from 'clsx';
import styles from './Indicators.module.scss';
import { useState } from 'react';

interface IndicatorsProps {
	// Categorys 는 API 가 완성되면 다시 타입 지정한다.
	Categorys: any;
	CategoryIndex: number;
	setCategoryIndex: () => {};
}

export default function Indicators({ Categorys, CategoryIndex, setCategoryIndex }: IndicatorsProps) {
	const [isOpenConfirmContext, setIsOpenConfirmContext] = useState(false);

	return (
		<div className={clsx(styles.Indicators)}>
			<nav>
				{Categorys.map((category, idx) => {
					return (
						<button key={idx} onClick={() => setCategoryIndex(idx)}>
							{category.title}
						</button>
					);
				})}
			</nav>
			<form>
				{Categorys[CategoryIndex].clientCheckedData.map((clientData, idx) => {
					return (
						<div key={idx} className={clsx(styles.categorysRow)}>
							<div>{clientData}</div>
							<input type='checkbox' />
						</div>
					);
				})}
			</form>
			{/* modal 버튼 */}
			<button onClick={() => setIsOpenConfirmContext(true)}>make Context</button>
			{isOpenConfirmContext && (
				<>
					<div onClick={() => setIsOpenConfirmContext(false)}>close</div>
					<div>Interest: 3, Exchange: 3, Consume: 3, Production: 3</div>
				</>
			)}
		</div>
	);
}
