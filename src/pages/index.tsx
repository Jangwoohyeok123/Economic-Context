import clsx from "clsx";
import styles from "./Home.module.scss";
import { Poppins, Roboto } from "next/font/google";
import { Router, useRouter } from "next/router";
import { useRef, useState } from "react";

// 전역 글꼴임
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--baseFont",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--pointFont",
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

// { Interest: {}, Exchange: {}, Consume: {}, Production: {}} 꼴로 전달받음
export default function Pages({
  Interest,
  Exchange,
  Consume,
  Production,
}: {
  Interest: Category;
  Exchange: Category;
  Consume: Category;
  Production: Category;
}) {
  const router = useRouter();
  const CategoryNames = Object.keys(arguments[0]);
  const Categorys = Object.values(arguments[0]);
  const [Index, setIndex] = useState(0);

  const GotoAboutPage = (seriesId: number) => {
    router.push(`/${seriesId}`);
  };

  // pr 은 남이보는 코드 => 최종본이라고 생각해야함 => 전까지는 개인차이
  return (
    <main className={clsx(styles.Home, poppins.variable, roboto.variable)}>
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
          return (
            <div className={clsx(styles.card)} key={idx}>
              <h3>{series.title}</h3>
              <p>{series.id}</p>
              <button>save</button>
              <button onClick={() => GotoAboutPage(series.id)}>more</button>
            </div>
          );
        })}
      </figure>
    </main>
  );
}

// server 쪽에서 popularity 기준으로 sort 를 진행하고 전달하고 싶은데 ...
// promise.all 적용실패
export async function getStaticProps() {
  const baseUrl = "https://api.stlouisfed.org/fred/";
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
      Production: Production,
    },
  };
}
