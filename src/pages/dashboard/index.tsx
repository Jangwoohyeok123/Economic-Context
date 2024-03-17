import clsx from 'clsx';
import Menu from '@/components/menu/Menu';
import styles from './Dashboard.module.scss';
import DashHeader from '@/components/dashheader/DashHeader';
import { useState } from 'react';
import MyContextTab from '@/components/myContext/MyContext';
import IndicatorsTab from '@/components/indicatorsTab/IndicatorsTab';
import { roboto, poppins } from '../_app';
import { useSelector } from 'react-redux';
import { Store } from '@/types/reduxType';
import { useQuery } from '@tanstack/react-query';
import { getContextNamesAndKey } from '@/backendApi/user';
import const_queryKey from '@/const/queryKey';

export default function Dashboard() {
	const [selectedTab, setSelectedTab] = useState<string>('Indicators');
	const userId = useSelector((state: Store) => state.user.id);
	const { data: contextNamesAndKey, isLoading } = useQuery({
		queryKey: [const_queryKey.context, 'names'],
		queryFn: () => getContextNamesAndKey(userId)
	});

	return (
		<div className={clsx(styles.Dashboard, roboto.variable, poppins.variable)}>
			<Menu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

			<section>
				<DashHeader selectedTab={selectedTab} />

				{selectedTab === 'Indicators' && <IndicatorsTab />}
				{selectedTab === 'MyContext' && <MyContextTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />}
			</section>
		</div>
	);
}
