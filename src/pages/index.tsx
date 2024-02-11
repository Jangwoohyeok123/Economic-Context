import clsx from "clsx";
import styles from "./Home.module.scss";
import { Poppins, Roboto } from "next/font/google";

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
  return (
    <div className={clsx(styles.Home, poppins.variable, roboto.variable)}>
      Home
    </div>
  );
}
