import clsx from 'clsx';
import * as S from '@/styles/CategoryTabMenu.style';
import const_categoryColor from '@/const/categoryColor';
import interest_mortgage from '@/public/interest_mortgage.svg';
import interest_fed from '@/public/interest_fed.svg';
import materials from '@/public/materials.svg';
import gdp from '@/public/gdp.svg';
import exchange from '@/public/exchange.svg';
import production from '@/public/production.svg';
import consume from '@/public/consume.svg';
import labor from '@/public/labor.svg';
import Image from 'next/image';

interface CategoryTabMenu_Props {
	categoryNames: string[];
	categoryIndex: number;
	selectCategory: (e: React.MouseEvent<HTMLButtonElement>, idx: number) => void;
}

/** categoryNames 배열을 전달하면 tab 기능을 제공한다. */
export default function CategoryTabMenu({ categoryNames, categoryIndex, selectCategory }: CategoryTabMenu_Props) {
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
						className={clsx({ on: idx === categoryIndex })}>
						{categoryNames[idx]}
						<span className={clsx('icon')}>
							<Image src={interest_mortgage} alt='icon' width={30} height={30} />
						</span>
					</S.MenuButton>
				);
			})}
		</S.TabMenuWrap>
	);
}
