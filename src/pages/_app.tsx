// import '@/styles/Reset.scss';
import store from '@/store/store';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Header from '../components/header/Header';
import { Poppins, Roboto } from 'next/font/google';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import const_categoryId from '@/const/categoryId';
import { GlobalStyles } from '@/styles/globalStyle';
import { checkRouterPathname } from '@/utils/checkRouterPathname';

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

export const categoryIdList = Object.values(const_categoryId);
export const frontUrl = process.env.NEXT_PUBLIC_FRONT_URL;
export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const queryClient = new QueryClient();

	return (
		<Provider store={store}>
			<GlobalStyles />
			<QueryClientProvider client={queryClient}>
				{checkRouterPathname(router.pathname) ? <Header /> : null}
				<Component {...pageProps} />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</Provider>
	);
}
