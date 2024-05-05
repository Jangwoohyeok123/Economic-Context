import clsx from 'clsx';
import styles from './Header.module.scss';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, toggleLoginModal } from '@/actions/actions';
import { Store_Type } from '@/types/redux';
import styled from 'styled-components';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500'],
	variable: '--pointFont'
});

export default function Header() {
	const isLogin = useSelector((state: Store_Type) => state.user.isLogin);
	const dispatch = useDispatch();

	return (
		<NavContainer className={clsx(styles.Header, poppins.variable)}>
			<nav className={clsx(styles.mainNav)}>
				<h1>
					<Link href='/'>EconomicContext</Link>
				</h1>
				{isLogin ? (
					<div className={clsx(styles.users)}>
						<Link href='/dashboard'>MyContext</Link>
						<span onClick={() => dispatch(logoutUser())}>Logout</span>
					</div>
				) : (
					<div className={clsx(styles.users)}>
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

	h1 {
		font-weight: 500;
	}

	a,
	span {
		font-size: 1.2rem;
	}

	.users {
		display: flex;
		gap: 20px;

		span {
			cursor: pointer;
		}
	}

	.mainNav {
		width: 80%;
		height: 100%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;

		h1 {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	@media screen and (max-width: var(--mobile)) {
		.Header {
			.mainNav {
				width: 95%;
			}
		}
	}
`;
