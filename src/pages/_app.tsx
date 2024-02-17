import '@/styles/Global.scss';
import '@/styles/Reset.scss';
import type { AppProps } from 'next/app';
import Header from '../components/header/Header';
import { Poppins, Roboto } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { createContext, useState } from 'react';
import { useRouter } from 'next/router';

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

interface UserContextType {
	SavedCardsCount: number;
	setSavedCardsCount: React.Dispatch<React.SetStateAction<number>>;
}

// 이 컨텍스트에는 어떤 내용이 들어갈지 interface + generic 으로 정의함
export const UserContext = createContext<UserContextType>({
	SavedCardsCount: 0, // 초기값 설정
	setSavedCardsCount: () => {} // 빈 함수로 초기화
});

// 이 APP 컴포넌트에는 어떤 Props 를 사용할지 정의함
export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [SavedCardsCount, setSavedCardsCount] = useState(0);

	const queryClient = new QueryClient();
	return (
		<UserContext.Provider value={{ SavedCardsCount, setSavedCardsCount }}>
			<QueryClientProvider client={queryClient}>
				{router.pathname !== '/dashboard' ? <Header /> : <></>}
				<Component {...pageProps} />
			</QueryClientProvider>
		</UserContext.Provider>
	);
}
