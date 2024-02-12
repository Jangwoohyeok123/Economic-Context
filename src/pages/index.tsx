import clsx from "clsx";
import styles from "./Home.module.scss";
import { Poppins, Roboto } from "next/font/google";
import { useRouter } from "next/router";

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

export default function Pages() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/1");
  };

  return (
    <main className={clsx(styles.Home, poppins.variable, roboto.variable)}>
      <button onClick={handleClick}>asdasd</button>
    </main>
  );
}
