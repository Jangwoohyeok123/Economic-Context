import clsx from 'clsx';
import styles from './Header.module.scss';
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, toggleLoginModal } from '@/actions/actions';
import LoginAlertModal from '../modals/loginAlertModal/LoginAlertModal';
import { Store_Type } from '@/types/redux';
import { frontUrl } from '@/pages/_app';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500'],
	variable: '--pointFont'
});

export default function Header() {
	const isLogin = useSelector((state: Store_Type) => state.user.isLogin);
	const dispatch = useDispatch();

	// 나중에 조건부 렌더링 컴포넌트 분리
	return (
		<>
			<header className={clsx(styles.Header, poppins.variable)}>
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
			</header>
		</>
	);
}
