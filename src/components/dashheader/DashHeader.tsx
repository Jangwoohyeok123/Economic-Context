import clsx from 'clsx';
import styles from './DashHeader.module.scss';
import { Store } from '@/types/reduxType';
import { useSelector } from 'react-redux';
import Image from 'next/image';

interface DashboardProp {
	Tabs: string[];
	TabsIndex: number;
}

export default function Dashheader({ Tabs, TabsIndex }: DashboardProp) {
	const user = useSelector((state: Store) => state.user);
	const profileImageUrl = user.picture_url;
	return (
		<header className={clsx(styles.DashHeader)}>
			<h2>{Tabs[TabsIndex]}</h2>
			<Image
				className={clsx(styles.userImage)}
				src={profileImageUrl}
				alt='User profile image'
				width={50} // 이 값은 적절하게 조정하세요
				height={50} // 이 값도 적절하게 조정하세요
				unoptimized={true} // 필요에 따라 최적화를 비활성화할 수 있습니다
			/>
		</header>
	);
}
