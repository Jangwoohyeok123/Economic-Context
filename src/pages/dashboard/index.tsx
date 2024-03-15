import clsx from 'clsx';
import Menu from '@/components/menu/Menu';
import styles from './Dashboard.module.scss';
import Dashheader from '@/components/dashheader/DashHeader';
import { useState } from 'react';
import MyContextTab from '@/components/myContext/MyContext';
import IndicatorsTab from '@/components/indicatorsTab/IndicatorsTab';
import { roboto, poppins } from '../_app';

export default function Dashboard() {
	const [Tabs] = useState(['Indicators', 'MyContext']);
	const [TabsIndex, setSelectedIdx] = useState(0);

	// Categorys 에 필요한 데이터: 사용자가 선택했던 카드데이터들
	const [categorys] = useState([
		{
			title: 'Interest',
			clientCheckedData: ['10년물 국채', '20년물 국채', '30년물 국채', '40년물 국채', '50년물 국채']
		},
		{
			title: 'Exchange',
			clientCheckedData: ['10년물 환율', '20년물 환율', '30년물 환율', '40년물 환율', '50년물 환율']
		},
		{
			title: 'Consume',
			clientCheckedData: ['10년물 소비', '20년물 소비', '30년물 소비', '40년물 소비', '50년물 소비']
		},
		{
			title: 'Production',
			clientCheckedData: ['10년물 생산', '20년물 생산', '30년물 생산', '40년물 생산', '50년물 생산']
		}
	]);
	const [categoryIndex, setCategoryIndex] = useState(0);

	return (
		<div className={clsx(styles.Dashboard, roboto.variable, poppins.variable)}>
			<Menu Tabs={Tabs} SelectedIdx={TabsIndex} setSelectedIdx={setSelectedIdx} />

			{/* section 에 padding 을 주면 header 가 문제생겨서 padding 을 각 요소에 나눠줌 */}
			<section>
				<Dashheader Tabs={Tabs} TabsIndex={TabsIndex} />

				{TabsIndex === 0 && (
					<IndicatorsTab categorys={categorys} categoryIndex={categoryIndex} setCategoryIndex={setCategoryIndex} />
				)}
				{TabsIndex === 1 && <MyContextTab />}
			</section>
		</div>
	);
}
// 탭을 이동할 시 clinetCategoryCheckedArr[idx] 의 값을 할당한다.
//

/*
	deleteFavorite 을 기능
	
	카드를 뭐 할떄마다 지금 
*/
