import clsx from 'clsx';
import styles from './Header.module.scss';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, toggleLoginModal } from '@/actions/actions';
import { Store_Type } from '@/types/redux';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500'],
	variable: '--pointFont'
});

export default function Header() {
	const isLogin = useSelector((state: Store_Type) => state.user.isLogin);
	const dispatch = useDispatch();

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
