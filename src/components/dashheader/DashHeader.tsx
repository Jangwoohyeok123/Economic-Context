import clsx from 'clsx';
import styles from './DashHeader.module.scss';
import ProfileImage from '../common/profileImage/ProfileImage';
import { useTabMenuViewer } from '@/pages/dashboard/TabMenuViewer';

interface DashHeaderProps {
	tab: string;
}

export default function DashHeader({ tab }: DashHeaderProps) {
	return (
		<header className={clsx(styles.DashHeader)}>
			<h2>{tab}</h2>
			<ProfileImage width={40} height={40} />
		</header>
	);
}
