import clsx from 'clsx';
import styles from './Login.module.scss';
import Image from 'next/image';
import { roboto, poppins } from '../_app';
import { useRouter } from 'next/router';

export default function Login() {
	const router = useRouter();
	const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
	const redirectUrl =
		process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL || 'https://dev-economic-context.vercel.app/google-callback';

	const moveToHomepage = () => router.push('/');

	const googleLogin = () => {
		const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
			redirectUrl
		)}&response_type=code&scope=email profile`;
		router.push(url);
	};

	return (
		<div className={clsx(styles.Login, poppins.variable, roboto.variable)}>
			<Image
				className={clsx(styles.background)}
				src='/loginBackground.jpg'
				alt='login-background'
				layout='fill'
				objectFit='cover'
			/>
			<div className={clsx(styles.wrap)}>
				<h1 className={clsx(styles.logo)} onClick={moveToHomepage}>
					<div>ECONOMIC</div>
					<div>CONTEXT</div>
				</h1>
				<div className={clsx(styles.buttonWrap)}>
					<div className={clsx(styles.loginButton)} onClick={googleLogin}>
						<span>Google Login</span>
					</div>
					<span className={clsx(styles.terms)}>Please agree to the Terms of Use of Economic-Context</span>
				</div>
			</div>
		</div>
	);
}
