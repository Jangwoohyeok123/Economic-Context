import clsx from 'clsx';
import styles from './Login.module.scss';
import loginBackground from '../../../public/loginBackground.jpg';
import Image from 'next/image';
import { roboto, poppins } from '../_app';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEO from '@/components/seo/SEO';

export default function Login() {
	const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
	const redirectUrl =
		process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL || 'https://dev-economic-context.vercel.app/google-callback';

	const googleLogin = () => {
		const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
			redirectUrl
		)}&response_type=code&scope=email profile`;
		window.location.href = url; //
	};

	return (
		<div className={clsx(styles.Login, poppins.variable, roboto.variable)}>
			<SEO title='Login' description='login to Economic Context' />
			<Image
				className={clsx(styles.background)}
				src={loginBackground}
				alt='login-background'
				quality={100}
				fill
				style={{ objectFit: 'cover' }}
				placeholder='blur'
				priority
			/>
			<div className={clsx(styles.wrap)}>
				<Link href={'/'} className={clsx(styles.logo)}>
					<p>
						ECONOMIC <br />
						CONTEXT
					</p>
				</Link>
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
