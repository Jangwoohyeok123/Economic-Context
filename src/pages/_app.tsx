import '@/styles/Global.scss';
import '@/styles/Reset.scss';

import store from '@/store/store';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Header from '../components/header/Header';
import { Poppins, Roboto } from 'next/font/google';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const categoryIds = {
	interest: '114',
	exchange: '94',
	production: '9',
	consume: '31'
};

export const roboto = Roboto({
	subsets: ['latin'],
	weight: ['300', '400', '500'],
	variable: '--baseFont'
});

export const poppins = Poppins({
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
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				{checkRouterPathname() ? <Header /> : null}
				<Component {...pageProps} />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</Provider>
	);
}
