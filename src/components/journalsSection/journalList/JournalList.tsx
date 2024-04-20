import Profile from '@/components/myContext/propfile/Profile';
import { Journal, JournalWrapper } from '@/styles/Journal.style';
import defaultProfile from '@/public/defaultProfile.png';
import * as S from '@/styles/ProfileImage.style';
import { Store_Type } from '@/types/redux';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function JournalList() {
	const user = useSelector((state: Store_Type) => state.user);
	const [loaded, setLoaded] = useState(true);
	const profileImageUrl = user.picture_url;
	return (
		<JournalWrapper>
			<Journal>
				{profileImageUrl && loaded ? (
					<S.ProfileImage
						src={profileImageUrl}
						alt='User profile image'
						width={40}
						height={40}
						onLoad={() => setLoaded(true)}
						onError={() => setLoaded(false)}
						unoptimized={true} // 필요에 따라 최적화를 비활성화할 수 있습니다
					/>
				) : (
					<S.ProfileImage src={defaultProfile} alt='User default profile image' width={40} height={40} unoptimized={true} />
				)}
			</Journal>
			<Journal></Journal>
		</JournalWrapper>
	);
}
