import clsx from 'clsx';
import styles from './DashHeader.module.scss';
import { Store_Type } from '@/types/redux';
import { useSelector } from 'react-redux';
import defaultProfile from '@/public/defaultProfile.png';
import * as S from '@/styles/ProfileImage.style';
import { useState } from 'react';
interface Dashboard_Prop {
	selectedTab: string;
}

export default function DashHeader({ selectedTab }: Dashboard_Prop) {
	const user = useSelector((state: Store_Type) => state.user);
	const [loaded, setLoaded] = useState(true);
	const profileImageUrl = user.picture_url;

	return (
		<header className={clsx(styles.DashHeader)}>
			<h2>{selectedTab}</h2>
			{profileImageUrl && loaded ? (
				<S.ProfileImage
					src={profileImageUrl}
					alt='User profile image'
					width={40} // 이 값은 적절하게 조정하세요
					height={40} // 이 값도 적절하게 조정하세요
					onLoad={() => setLoaded(true)}
					onError={() => setLoaded(false)}
					unoptimized={true} // 필요에 따라 최적화를 비활성화할 수 있습니다
				/>
			) : (
				<S.ProfileImage src={defaultProfile} alt='User default profile image' width={40} height={40} unoptimized={true} />
			)}
		</header>
	);
}
