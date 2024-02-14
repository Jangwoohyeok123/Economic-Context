import clsx from "clsx";
import styles from "./CategoryId.module.scss";
import { useRouter } from "next/router";
import { Poppins, Roboto } from "next/font/google";
import { useQueryfetchChartDataById } from "@/query/useQueryChartdata";
import { useEffect, useState } from "react";

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

export default function CatgId() {
  const router = useRouter();
  const { id: seriesId } = router.query;
  const [Data, setData] = useState([]);

  // const { data, isSuccess } = useQueryfetchChartDataById(seriesId);
  useEffect(() => {
    const a = fetch(`/api/hello?seriesId=${seriesId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => setData(data.observations));
  }, []);

  useEffect(() => {
    console.log(Data);
  }, [Data]);

  return (
    <main className={clsx(styles.CatgId, poppins.variable, roboto.variable)}>
      {Data.map((data, idx) => {
        return <div key={idx}>{data.value}</div>;
      })}
    </main>
  );
}

// export async function getStaticProps() {
//   // server 에서는 잘 받아짐
//   const fetchdata = await fetch(
//     `https://api.stlouisfed.org/fred/series/observations?series_id=FHA30&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
//   );
//   const jsonTest = await fetchdata.json();

//   console.log(jsonTest);
// }

// ssg 방식처리? vs proxy 처리
