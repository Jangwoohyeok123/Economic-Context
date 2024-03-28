import clsx from 'clsx';
import Menu from '@/components/menu/Menu';
import styles from './Dashboard.module.scss';
import DashHeader from '@/components/dashheader/DashHeader';
import { useState } from 'react';
import MyContextTab from '@/components/myContext/MyContext';
import IndicatorsTab from '@/components/indicatorsTab/IndicatorsTab';
import { roboto, poppins } from '../_app';
import { useSelector } from 'react-redux';
import { Store_Type } from '@/types/redux';
import { useQuery } from '@tanstack/react-query';
import const_queryKey from '@/const/queryKey';
import { getContextNameWithKey_List } from '@/api/context';

export default function Dashboard() {
	const [selectedTab, setSelectedTab] = useState<string>('Indicators');
	const userId = useSelector((state: Store_Type) => state.user.id);
	const { data: contextNamesWithKey, isLoading } = useQuery({
		queryKey: [const_queryKey.context, 'names'],
		queryFn: () => getContextNameWithKey_List(userId)
	});

	return (
		<section className={clsx(styles.Dashboard, roboto.variable, poppins.variable)}>
			<Menu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

			<section>
				<DashHeader selectedTab={selectedTab} />

				{selectedTab === 'Indicators' ? (
					<IndicatorsTab />
				) : (
					<MyContextTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
				)}
			</section>
		</section>
	);
}
