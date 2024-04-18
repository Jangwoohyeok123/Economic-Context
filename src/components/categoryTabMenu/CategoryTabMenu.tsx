import clsx from 'clsx';
import * as S from '@/styles/CategoryTabMenu.style';

interface CategoryTabMenu_Props {
	categoryNames: string[];
	categoryIndex: number;
	selectCategory: (e: React.MouseEvent<HTMLButtonElement>, idx: number) => void;
}

/** categoryNames 배열을 전달하면 tab 기능을 제공한다. */
export default function CategoryTabMenu({ categoryNames, categoryIndex, selectCategory }: CategoryTabMenu_Props) {
	return (
		<S.TabMenu>
			{categoryNames.map((_, idx) => {
				return (
					<button
						key={idx}
						onClick={e => {
							selectCategory(e, idx);
						}}
						type='button'
						className={clsx({ on: idx === categoryIndex })}>
						{categoryNames[idx]}
					</button>
				);
			})}
		</S.TabMenu>
	);
}
