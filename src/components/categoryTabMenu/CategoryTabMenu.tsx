import clsx from 'clsx';
import styles from './CategoryTabMenu.module.scss';
import { useState } from 'react';

interface CategoryTabMenu_Props {
	categoryNames: string[];
}

/** categoryNames 배열을 전달하면 tab 기능을 제공한다. */
export default function CategoryTabMenu({ categoryNames }: CategoryTabMenu_Props) {
	const [categoryIndex, setCategoryIndex] = useState(0);
	return (
		<div className={clsx(styles.CategoryTabMenu)}>
			{categoryNames.map((_, idx) => {
				return (
					<button
						className={clsx(categoryIndex === idx ? clsx(styles.on) : '')}
						key={idx}
						onClick={() => {
							setCategoryIndex(idx);
						}}>
						{categoryNames[idx]}
					</button>
				);
			})}
		</div>
	);
}
