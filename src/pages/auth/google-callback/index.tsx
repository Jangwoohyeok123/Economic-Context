import clsx from 'clsx';
import styles from './googleCallback.module.scss';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getJwtAndGoogleUserData } from '@/api/user';
import { useDispatch } from 'react-redux';
import { login } from '@/actions/actions';
import { useSearchParams } from 'next/navigation';

/*
  인가코드를 파싱한다.
*/
export default function GoogleCallback() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const dispatch = useDispatch();

	const setJwtAndUserData = async (authCode: string) => {
		if (authCode) {
			try {
				getJwtAndGoogleUserData(authCode).then(result => {
					console.log('getJwtAndGoogleUserData', '실행');
					const { jwt, userData } = result;
					sessionStorage.setItem('token', jwt);
					dispatch(login(userData));
					router.push('/');
				});
			} catch (error: any) {
				console.error('인가코드이용한 로그인 과정에 문제가 있습니다. auth/google-callback');
			}
		}
	};

	useEffect(() => {
		const authCode = searchParams.get('code');
		if (authCode) setJwtAndUserData(authCode);
	}, [searchParams.get('code')]); //

	return <div className={clsx(styles.GoogleCallback)}></div>;
}
