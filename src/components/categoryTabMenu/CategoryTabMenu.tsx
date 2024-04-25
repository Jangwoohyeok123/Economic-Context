import clsx from 'clsx';
import * as S from '@/styles/CategoryTabMenu.style';
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
	selectedCategoryId: number;
	setSelectedCategoryId: React.Dispatch<React.SetStateAction<number>>;
	selectCategory?: (e: React.MouseEvent<HTMLButtonElement>, categoryId: number) => void;
	categoryIdList: number[];
}

export default function CategoryTabMenu({
	selectedCategoryId,
	setSelectedCategoryId,
	selectCategory = () => {},
	categoryIdList
}: CategoryTabMenu_Props) {
	return (
		<S.TabMenuWrap>
			{categoryIdList.map((categoryId, idx) => {
				return (
					<S.MenuButton
						key={categoryId + idx}
						onClick={e => {
							selectCategory(e, categoryId);
							setSelectedCategoryId(categoryId);
						}}
						$categoryColor={changeCategoryIdToColor(categoryId)}
						className={clsx({ on: categoryId === selectedCategoryId })}>
						{changeCategoryIdToName(categoryId)}
						<span className={clsx('icon')}>
							{(() => {
								const name = changeCategoryIdToName(categoryId);
								const color = categoryId === selectedCategoryId ? '#fefefe' : changeCategoryIdToColor(categoryId);
								let svgComponent = <Interest_mortgage fill={color} />;
								switch (name) {
									case 'Mortgage':
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
										svgComponent = <Labor fill={color} />;
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
