import clsx from 'clsx';
import styles from './MyContext.module.scss';
import { changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import { useState } from 'react';

export default function MyContext() {
	const categoryNames = ['interest', 'exchange', 'consume', 'production'];
	const [categoryIndex, setCategoryIndex] = useState(0);

	return (
		<div className={clsx(styles.MyContext)}>
			<nav>
				{categoryNames.map((categoryName, index) => {
					const categoryId = changeNameToCategoryId(categoryName);
					return (
						<button
							key={categoryName}
							className={categoryIndex === index ? styles.on : ''}
							onClick={() => setCategoryIndex(index)}>
							{categoryNames[index]}
						</button>
					);
				})}
			</nav>
		</div>
	);
}
