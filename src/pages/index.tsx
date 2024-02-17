import clsx from 'clsx';
import styles from './Home.module.scss';
import { Poppins, Roboto } from 'next/font/google';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UserContext } from './_app';
import Image from 'next/image';

// 전역 글꼴임
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

interface Seriess {
	frequency: string;
	frequency_short: string;
	group_popularity: number;
	id: string;
	last_updated: string;
	observation_end: string;
	observation_start: string;
	popularity: number;
	realtime_end: string;
	realtime_start: string;
	seasonal_adjustment: string;
	seasonal_adjustment_short: string;
	title: string;
	units: string;
	units_short: string;
}

interface Category {
	count: number;
	limit: number;
	offset: number;
	order_by: string;
	realtime_end: string;
	realtime_start: string;
	seriess: Seriess[];
	sort_order: string;
}

// 함수를 선언할 때 뭐가 들어갈지 정확히 정의할 때 타입스크립트를 사용한다.
// { Interest: {}, Exchange: {}, Consume: {}, Production: {}} 꼴로 전달받음
export default function Pages({
	Interest,
	Exchange,
	Consume,
	Production
}: {
	Interest: Category;
	Exchange: Category;
	Consume: Category;
	Production: Category;
}) {
	const { SavedCardsCount, setSavedCardsCount } = useContext(UserContext);
	const router = useRouter();
	const CategoryNames = Object.keys(arguments[0]);
	const Categorys = Object.values(arguments[0]);
	const [Index, setIndex] = useState(0);

	const GotoAboutPage = (seriesId: string) => {
		router.push(`/${seriesId}`);
	};

	const saveCardToDB = (CategoryName: string, seriesId: string, login: boolean) => {
		// save 를 누르면 로그인 여부를 체크한다.
		if (login) {
			// db 로 부터 전달받은 id 배열을 탐색한 후 없다면 DB 에 추가하며 + 1
			setSavedCardsCount(() => SavedCardsCount + 1);
			// db save
		} else {
			alert('This service requires login');
			router.push(`/login`);
		}
	};

	return (
		<>
			<main className={clsx(styles.Home, poppins.variable, roboto.variable)}>
				<div className={clsx(styles.mainImage)}>
					<Image src='/mainImage.jpg' alt='mainImage' layout='fill' objectFit='cover' />
				</div>
				<div className={clsx(styles.tab)}>
					{Categorys.map((el, idx) => {
						return (
							<button key={idx} onClick={() => setIndex(idx)}>
								{CategoryNames[idx]}
							</button>
						);
					})}
				</div>
				<figure className={clsx(styles.category)}>
					{Categorys[Index].seriess.map((series, idx: number) => {
						const seriesId = series.id;
						const title = series.title;
						return (
							<div className={clsx(styles.card)} key={idx}>
								<h3>{title}</h3>
								<div className={clsx(styles.buttons)}>
									<button
										onClick={() => {
											saveCardToDB(CategoryNames[Index], seriesId, false);
										}}>
										save
									</button>
									<button onClick={() => GotoAboutPage(seriesId)}>more</button>
								</div>
							</div>
						);
					})}
				</figure>
			</main>
		</>
	);
}

// server 쪽에서 popularity 기준으로 sort 를 진행하고 전달하고 싶은데 ...
// promise.all 적용실패
export async function getStaticProps() {
	const baseUrl = 'https://api.stlouisfed.org/fred/';
	const fetchInterestCategory = await fetch(
		`${baseUrl}category/series?category_id=114&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
	);
	const Interest = await fetchInterestCategory.json();

	const fetchExchangeCategory = await fetch(
		`${baseUrl}category/series?category_id=94&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
	);
	const Exchange = await fetchExchangeCategory.json();

	const fetchConsumeCategory = await fetch(
		`${baseUrl}category/series?category_id=9&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
	);
	const Consume = await fetchConsumeCategory.json();

	const fetchProductionCategory = await fetch(
		`${baseUrl}category/series?category_id=31&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
	);
	const Production = await fetchProductionCategory.json();

	return {
		// 4개를 한 번에 호출해야하는지 고민해볼 것
		// prefetching? hover 시 fetcing 이 일어나는 기능이 있음
		// a fethcing 하고 bcd 는 prefetcging 이용할 수 있음 promise.all 과 고민해볼 것
		// props 는 json'Category이름' 꼴로 전송해야한다. 화면에 json 이후 글자가 표기되기 때문이다.
		props: {
			Interest: Interest,
			Exchange: Exchange,
			Consume: Consume,
			Production: Production
		}
	};
}
