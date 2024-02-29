import clsx from 'clsx';
import styles from './Header.module.scss';
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/actions/actions';

interface HeaderProps {
	children: React.ReactNode;
}

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500'],
	variable: '--pointFont'
});

export default function Header() {
	const isLogin = useSelector(state => state.user.isLogin);
	const router = useRouter();
	const dispatch = useDispatch();

	const goToLoginPage = () => {
		console.log(isLogin);
		if (!isLogin) {
			alert('custom alert 으로 로그인유도');
			window.location.href = 'http://localhost:3000/login';
		}
	};

	const userLogout = () => {
		console.log(isLogin);
		alert('modal logout 알림');
		dispatch(logout());
		// window.location.href = 'http://localhost:3000';
	};

	// 나중에 조건부 렌더링 컴포넌트 분리
	return (
		<header className={clsx(styles.Header, poppins.variable)}>
			<nav className={clsx(styles.mainNav)}>
				<Link href='/'>EconomicContext</Link>
				{isLogin ? (
					<div className={clsx(styles.users)}>
						<Link href='/dashboard'>MyContext</Link>
						<span onClick={userLogout}>Logout</span>
					</div>
				) : (
					<div className={clsx(styles.users)}>
						<span onClick={goToLoginPage}>MyContext</span>
						<Link href='/login'>Login</Link>
					</div>
				)}
			</nav>
		</header>
	);
}
