import clsx from 'clsx';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, toggleLoginModal } from '@/actions/actions';
import { Store_Type } from '@/types/redux';
import styled from 'styled-components';
import Image from 'next/image';
import { test } from '../../const/responsive';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500'],
	variable: '--pointFont'
});

export default function Header() {
	const isLogin = useSelector((state: Store_Type) => state.user.isLogin);
	const dispatch = useDispatch();

	return (
		<NavContainer className={clsx(poppins.variable)}>
			<nav>
				<Link href='/'>
					<Image src='/logo.png' alt='logo' width={224} height={32} />
				</Link>
				{isLogin ? (
					<div>
						<Link href='/dashboard'>MyContext</Link>
						<span onClick={() => dispatch(logoutUser())}>Logout</span>
					</div>
				) : (
					<div>
						<span onClick={() => dispatch(toggleLoginModal())}>MyContext</span>
						<Link href='/login'>Login</Link>
					</div>
				)}
			</nav>
		</NavContainer>
	);
}

const NavContainer = styled.header`
	font-family: var(--pointFont);
	height: 60px;
	width: 100%;
	background: var(--fontColor);
	color: var(--bgColor);
	position: fixed;
	top: 0;
	z-index: 10;

	nav {
		display: flex;
		padding: 0 40px;
		height: 100%;
		justify-content: space-between;
		align-items: center;

		h1 {
			font-weight: 500;
		}

		a,
		span {
			font-size: 1.2rem;
		}
	}

	// screen의 크기가 최대 1000px까지
	@media screen and (max-width: 800px) {
		nav {
			padding: 0 0px;
		}
	}
`;
