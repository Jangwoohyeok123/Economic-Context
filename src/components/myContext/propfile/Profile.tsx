import { Store_Type } from '@/types/redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { TfiEmail } from 'react-icons/tfi';
import ProfileImage from '@/components/common/profileImage/ProfileImage';

const ProfileWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px 0 40px;
	.profile {
		position: relative;
		display: block;
		border-radius: 50px;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 12px;
		> img {
			height: 100%;
			object-fit: cover;
		}
	}
	.id {
		font-size: 1.2rem;
		font-weight: bold;
		margin-bottom: 5px;
		color: rgba(var(--fontColor-code), 0.8);
	}
	.email {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 0.7rem;
		gap: 2px;
		> svg {
			font-size: 0.7rem;
			color: rgba(var(--fontColor-code), 0.6);
		}
	}
`;

export default function Profile() {
	const user = useSelector((state: Store_Type) => state.user);

	return (
		<ProfileWrapper>
			<span className='profile'>
				<ProfileImage width={70} height={70} />
			</span>
			<span className='id'>{user.google_id || 'user_id'}</span>
			<span className='email'>
				<TfiEmail />
				{user.email || 'email@email.com'}
			</span>
		</ProfileWrapper>
	);
}
