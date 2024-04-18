import clsx from 'clsx';
import styles from './CategoryTabMenu.module.scss';
import { useState } from 'react';

interface CategoryTabMenu_Props {
	categoryNames: string[];
	categoryIndex: number;
	selectCategory: (e: React.MouseEvent<HTMLButtonElement>, idx: number) => void;
}

/** categoryNames 배열을 전달하면 tab 기능을 제공한다. */
export default function CategoryTabMenu({ categoryNames, categoryIndex, selectCategory }: CategoryTabMenu_Props) {
	return (
		<div className={clsx(styles.CategoryTabMenu)}>
			{categoryNames.map((_, idx) => {
				return (
					<button
						className={clsx(categoryIndex === idx ? clsx(styles.on) : '')}
						key={idx}
						onClick={e => {
							selectCategory(e, idx);
						}}>
						{categoryNames[idx]}
					</button>
				);
			})}
		</div>
	);
}
