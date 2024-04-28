import { Store_Type } from '@/types/redux';
import { useSelector } from 'react-redux';
import defaultProfile from '@/public/defaultProfile.png';
import * as S from '@/styles/ProfileImage.style';
import { useState } from 'react';

interface ProfileImage_Props {
	width: number;
	height: number;
}
export default function ProfileImage({ width, height }: ProfileImage_Props) {
	const user = useSelector((state: Store_Type) => state.user);
	const [loaded, setLoaded] = useState(true);
	const profileImageUrl = user.picture_url;

	return (
		<>
			{profileImageUrl && loaded ? (
				<S.ProfileImage
					src={profileImageUrl}
					alt='User profile image'
					width={width}
					height={height}
					onLoad={() => setLoaded(true)}
					onError={() => setLoaded(false)}
					unoptimized={true}
				/>
			) : (
				<S.ProfileImage src={defaultProfile} alt='User default profile image' width={width} height={height} unoptimized={true} />
			)}
		</>
	);
}
