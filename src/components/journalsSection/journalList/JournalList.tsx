import ProfileImage from '@/components/common/profileImage/ProfileImage';
import { Journal, JournalWrapper } from '@/styles/Journal.style';

export default function JournalList() {
	return (
		<JournalWrapper>
			<Journal>
				<ProfileImage width={30} height={30} />
			</Journal>
			<Journal></Journal>
		</JournalWrapper>
	);
}
