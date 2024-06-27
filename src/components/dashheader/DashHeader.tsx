import clsx from 'clsx';
import styles from './DashHeader.module.scss';
import ProfileImage from '../common/profileImage/ProfileImage';
import { useContext } from 'react';
import { SelectedTabContext } from '@/store/context/selectedTabContext';

export default function DashHeader() {
	const { selectedTab } = useContext(SelectedTabContext);

	return (
		<header className={clsx(styles.DashHeader)}>
			<h2>{selectedTab}</h2>
			<ProfileImage width={40} height={40} />
		</header>
	);
}
