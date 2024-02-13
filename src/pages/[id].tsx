import clsx from "clsx";
import styles from "./CatgId.module.scss";
import { useRouter } from "next/router";
import { Poppins, Roboto } from "next/font/google";
import { useQueryfetchChartDataById } from "@/query/useQueryChartdata";

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
  const { data, isSuccess } = useQueryfetchChartDataById(seriesId);

  return (
    <main
      className={clsx(styles.CatgId, poppins.variable, roboto.variable)}
    ></main>
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
