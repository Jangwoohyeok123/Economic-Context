import clsx from 'clsx';
import styles from './Dashboard.module.scss';
import TabMenuViewer, { useTabMenuViewer } from './TabMenuViewer';

const DashboardContent = () => {
	const { selectedTab } = useTabMenuViewer();
	const tabs = ['Indicators', 'MyContext'];

	return (
		<section className={clsx(styles.Dashboard)}>
			<TabMenuViewer.TabMenu tabs={tabs} />
			{selectedTab === 'Indicators' ? <TabMenuViewer.IndicatorsTab /> : <TabMenuViewer.MyContextTab />}
		</section>
	);
};

export default function Dashboard() {
	return (
		<TabMenuViewer initTab='Indicators'>
			<DashboardContent />
		</TabMenuViewer>
	);
}
