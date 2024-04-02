import clsx from 'clsx';
import styles from './Login.module.scss';
import loginBackground from '../../../public/loginBackground.jpg';
import Image from 'next/image';
import { roboto, poppins } from '../_app';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

export default function Login() {
	const router = useRouter();
	const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
	const redirectUrl =
		process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL || 'https://dev-economic-context.vercel.app/google-callback';

	return (
		<div className={clsx(styles.Login, poppins.variable, roboto.variable)}>
			<Head>
				<title>{`login page | Economic Context`}</title>
				<meta property='og:title' content='login page | Economic Context' />
				<meta property='og:type' content='website' />
				<meta
					name='description'
					content='경제지표를 편리하게 저장해두고, 나의 일지를 작성할 수 있습니다. 로그인으로 시작하세요.'
				/>
				<meta property='og:url' content='https://localhost:3000' />
			</Head>
			<Image
				className={clsx(styles.background)}
				src={loginBackground}
				alt='login-background'
				quality={100}
				fill
				style={{ objectFit: 'cover' }}
				placeholder='blur' //사용자 경험을 향상(이미지 최적화x)
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
					<Link
						href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
							redirectUrl
						)}&response_type=code&scope=email profile`}
						className={clsx(styles.loginButton)}>
						<span>Google Login</span>
					</Link>
					<span className={clsx(styles.terms)}>Please agree to the Terms of Use of Economic-Context</span>
				</div>
			</div>
		</div>
	);
}
