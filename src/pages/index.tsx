import clsx from "clsx";
import styles from "./Home.module.scss";
import { Poppins, Roboto } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { MouseEvent } from "react";

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

// { props 의 key 값 }: { props 의 key 값: 타입 }
export default function Pages({
  jsonInterest,
  jsonExchange,
  jsonConsume,
  jsonProduction,
}: {
  jsonInterest: Category;
  jsonExchange: Category;
  jsonConsume: Category;
  jsonProduction: Category;
}) {
  const CategoryNames = Object.keys(arguments[0]).map((ag) => {
    return ag.slice(4);
  });
  const Categorys = Object.values(arguments[0]);
  const [Index, setIndex] = useState(0);

  const handleCategoryIndex = (idx: number) => {
    setIndex(idx);
  };

  return (
    <main className={clsx(styles.Home, poppins.variable, roboto.variable)}>
      <div className={clsx(styles.tab)}>
        {Categorys.map((el, idx) => {
          return (
            <button key={idx} onClick={() => handleCategoryIndex(idx)}>
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
              <button>more</button>
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
  const fetchInterestCategory = await fetch(
    `https://api.stlouisfed.org/fred/category/series?category_id=114&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
  );
  const jsonInterest = await fetchInterestCategory.json();

  const fetchExchangeCategory = await fetch(
    `https://api.stlouisfed.org/fred/category/series?category_id=94&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
  );
  const jsonExchange = await fetchExchangeCategory.json();

  const fetchConsumeCategory = await fetch(
    `https://api.stlouisfed.org/fred/category/series?category_id=9&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
  );
  const jsonConsume = await fetchConsumeCategory.json();

  const fetchProductionCategory = await fetch(
    `https://api.stlouisfed.org/fred/category/series?category_id=31&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
  );
  const jsonProduction = await fetchProductionCategory.json();

  return {
    props: {
      jsonInterest: jsonInterest,
      jsonExchange: jsonExchange,
      jsonConsume: jsonConsume,
      jsonProduction: jsonProduction,
    },
  };
}
