import clsx from 'clsx';
import styles from './googleCallback.module.scss';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getJwtAndGoogleUserData } from '@/api/user';
import { useDispatch } from 'react-redux';
import { login } from '@/actions/actions';

export default function GoogleCallback() {
	const router = useRouter();
	const dispatch = useDispatch();

	//
	const setJwtAndUserData = async (authCode: string) => {
		if (authCode) {
			try {
				const result = await getJwtAndGoogleUserData(authCode);
				const { jwt, userData } = result;
				sessionStorage.setItem('token', jwt);
				dispatch(login(userData));
				router.push('/');
			} catch (error) {
				console.error('인가코드 이용한 로그인 과정에 문제가 있습니다. auth/google-callback', error);
			}
		}
	};

	useEffect(() => {
		const authCode = router.query.code;
		if (typeof authCode === 'string') {
			setJwtAndUserData(authCode);
		}
	}, [router.isReady]);

	return <div className={clsx(styles.GoogleCallback)}></div>;
}
