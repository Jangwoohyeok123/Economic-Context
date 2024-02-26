import { roboto, poppins } from '../index';
import styles from './Dashboard.module.scss';
import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import Menu from '@/components/menu/Menu';
import Dashheader from '@/components/dashheader/DashHeader';
import Indicators from '@/components/indicators/Indicators';
import { CheckedCardSetContext } from '@/contexts/checkedCardSetContext';

const 사용자가_선택한_카테고리_카드데이터_Consume = [
	{
		title: '10년물 국채'
		// checked: true
	},
	{
		title: '20년물 국채'
	},
	{
		title: '20년물 국채'
	}
];

const 사용자가_선택한_카테고리_카드데이터_Exchange = [
	{
		title: '10년물 국채'
		// checked: true
	},
	{
		title: '20년물 국채'
	},
	{
		title: '20년물 국채'
	}
];

const 사용자가_선택한_카테고리_카드데이터_Interest = [
	{
		title: '10년물 국채'
		// checked: true
	},
	{
		title: '20년물 국채'
	},
	{
		title: '20년물 국채'
	}
];

export default function Dashboard() {
	const [Tabs] = useState(['Indicators', 'MyContext']);
	const [TabsIndex, setSelectedIdx] = useState(0);
	const { checkedCardSet, setCheckedCardSet } = useContext(CheckedCardSetContext);

	useEffect(() => {
		console.log(checkedCardSet);
	}, [checkedCardSet]);

	// Categorys 에 필요한 데이터: 사용자가 선택했던 카드데이터들
	const [Categorys] = useState([
		{
			title: 'Interest',
			clientCheckedData: ['10년물 국채', '20년물 국채', '30년물 국채']
		},
		{
			title: 'Exchange',
			clientCheckedData: ['10년물 환율', '20년물 환율', '30년물 환율']
		},
		{
			title: 'Consume',
			clientCheckedData: ['10년물 소비', '20년물 소비', '30년물 소비']
		},
		{
			title: 'Production',
			clientCheckedData: ['10년물 생산', '20년물 생산', '30년물 생산']
		}
	]);
	const [CategoryIndex, setCategoryIndex] = useState(0);

	return (
		<div className={clsx(styles.Dashboard, roboto.variable, poppins.variable)}>
			<Menu Tabs={Tabs} SelectedIdx={TabsIndex} setSelectedIdx={setSelectedIdx} />

			{/* section 에 padding 을 주면 header 가 문제생겨서 padding 을 각 요소에 나눠줌 */}
			<section>
				<Dashheader Tabs={Tabs} TabsIndex={TabsIndex} />

				{Tabs[TabsIndex] === 'Indicators' ? (
					<Indicators Categorys={Categorys} CategoryIndex={CategoryIndex} setCategoryIndex={setCategoryIndex} />
				) : (
					<div>MyContext</div>
				)}
			</section>
		</div>
	);
}
// 탭을 이동할 시 clinetCategoryCheckedArr[idx] 의 값을 할당한다.
//
