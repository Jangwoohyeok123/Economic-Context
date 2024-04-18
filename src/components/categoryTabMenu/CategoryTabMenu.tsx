import clsx from 'clsx';
import * as S from '@/styles/CategoryTabMenu.style';
import const_categoryColor from '@/const/categoryColor';
import Interest_mortgage from '@/public/interest_mortgage.svg';
import Interest_fed from '@/public/interest_fed.svg';
import Materials from '@/public/materials.svg';
import Gdp from '@/public/gdp.svg';
import Exchange from '@/public/exchange.svg';
import Production from '@/public/production.svg';
import Consume from '@/public/consume.svg';
import Labor from '@/public/labor.svg';

interface CategoryTabMenu_Props {
	categoryNames: string[];
	categoryIndex: number;
	selectCategory: (e: React.MouseEvent<HTMLButtonElement>, idx: number) => void;
}

/** categoryNames 배열을 전달하면 tab 기능을 제공한다. */
export default function CategoryTabMenu({ categoryNames, categoryIndex: selectedCategory, selectCategory }: CategoryTabMenu_Props) {
	return (
		<S.TabMenuWrap>
			{categoryNames.map((_, idx) => {
				return (
					<S.MenuButton
						key={idx}
						onClick={e => {
							selectCategory(e, idx);
						}}
						$categoryColor={const_categoryColor[idx].color}
						className={clsx({ on: idx === selectedCategory })}>
						{categoryNames[idx]}
						<span className={clsx('icon')}>
							{const_categoryColor[idx].name === 'interest_mortgage' && (
								<Interest_mortgage fill={idx === selectedCategory ? '#fefefe' : const_categoryColor[idx].color} />
							)}
							{const_categoryColor[idx].name === 'interest_fed' && (
								<Interest_fed stroke={idx === selectedCategory ? '#fefefe' : const_categoryColor[idx].color} />
							)}
							{const_categoryColor[idx].name === 'materials' && (
								<Materials stroke={idx === selectedCategory ? '#fefefe' : const_categoryColor[idx].color} />
							)}
							{const_categoryColor[idx].name === 'gdp' && <Gdp fill={idx === selectedCategory ? '#fefefe' : const_categoryColor[idx].color} />}
							{const_categoryColor[idx].name === 'exchange' && (
								<Exchange stroke={idx === selectedCategory ? '#fefefe' : const_categoryColor[idx].color} />
							)}
							{const_categoryColor[idx].name === 'production' && (
								<Production fill={idx === selectedCategory ? '#fefefe' : const_categoryColor[idx].color} />
							)}
							{const_categoryColor[idx].name === 'consume' && (
								<Consume fill={idx === selectedCategory ? '#fefefe' : const_categoryColor[idx].color} />
							)}
							{const_categoryColor[idx].name === 'labor' && <Labor stroke={idx === selectedCategory ? '#fefefe' : const_categoryColor[idx].color} />}
						</span>
					</S.MenuButton>
				);
			})}
		</S.TabMenuWrap>
	);
}
