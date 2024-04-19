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
import { changeCategoryIdToColor, changeCategoryIdToName } from '@/utils/changeNameToCategoryId';

interface CategoryTabMenu_Props {
	categoryNames: string[];
	categoryIdList: number[];
	categoryIndex: number;
	selectCategory: (e: React.MouseEvent<HTMLButtonElement>, idx: number) => void;
}

/** categoryNames 배열을 전달하면 tab 기능을 제공한다. */
export default function CategoryTabMenu({ categoryNames, categoryIndex: selectedCategory, selectCategory, categoryIdList }: CategoryTabMenu_Props) {
	return (
		<S.TabMenuWrap>
			{categoryNames.map((_, idx) => {
				return (
					<S.MenuButton
						key={idx}
						onClick={e => {
							selectCategory(e, idx);
						}}
						$categoryColor={changeCategoryIdToColor(categoryIdList[idx])}
						className={clsx({ on: idx === selectedCategory })}>
						{categoryNames[idx]}
						<span className={clsx('icon')}>
							{(() => {
								const name = changeCategoryIdToName(categoryIdList[idx]);
								const color = idx === selectedCategory ? '#fefefe' : changeCategoryIdToColor(categoryIdList[idx]);
								let svgComponent = <Interest_mortgage fill={color} />;
								switch (name) {
									case 'Interest':
										svgComponent = <Interest_mortgage fill={color} />;
										break;
									case 'Fed':
										svgComponent = <Interest_fed stroke={color} />;
										break;
									case 'Materials':
										svgComponent = <Materials stroke={color} />;
										break;
									case 'GDP':
										svgComponent = <Gdp fill={color} />;
										break;
									case 'Exchange':
										svgComponent = <Exchange stroke={color} />;
										break;
									case 'Production':
										svgComponent = <Production stroke={color} />;
										break;
									case 'Consume':
										svgComponent = <Consume fill={color} />;
										break;
									case 'Labor':
										svgComponent = <Labor stroke={color} />;
										break;
									default:
										return svgComponent;
								}
								return svgComponent;
							})()}
						</span>
					</S.MenuButton>
				);
			})}
		</S.TabMenuWrap>
	);
}
