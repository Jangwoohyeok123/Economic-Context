import clsx from 'clsx';
import styles from './DashHeader.module.scss';
import ProfileImage from '../common/profileImage/ProfileImage';
interface Dashboard_Prop {
	selectedTab: string;
}

export default function DashHeader({ selectedTab }: Dashboard_Prop) {
	return (
		<header className={clsx(styles.DashHeader)}>
			<h2>{selectedTab}</h2>
			<ProfileImage width={40} height={40} />
		</header>
	);
}
