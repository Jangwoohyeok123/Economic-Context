import '@/styles/Global.scss';
import '@/styles/Reset.scss';

import type { AppProps } from 'next/app';
import Header from '../components/header/Header';
import { Poppins, Roboto } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useRouter } from 'next/router';
import { CheckedCardSetProvider } from '@/contexts/checkedCardSetContext';
import { Provider } from 'react-redux';
import store from '@/store/store';

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['300', '400', '500'],
	variable: '--baseFont'
});

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500'],
	variable: '--pointFont'
});

// 이 APP 컴포넌트에는 어떤 Props 를 사용할지 정의함
export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	const checkRouterPathname = () => {
		const pathname = router.pathname;
		if (pathname === '/login') return false;
		if (pathname === '/dashboard') return false;

		return true;
	};

	const queryClient = new QueryClient();

	return (
		<CheckedCardSetProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					{checkRouterPathname() ? <Header /> : <></>}
					<Component {...pageProps} />
				</QueryClientProvider>
			</Provider>
		</CheckedCardSetProvider>
	);
}
