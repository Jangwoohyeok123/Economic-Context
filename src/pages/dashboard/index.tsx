import clsx from "clsx";
import styles from "./Dashboard.module.scss";
import { Roboto } from "next/font/google";
import Menu from "@/components/menu/Menu";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--baseFont",
});

export default function Dashboard() {
  return (
    <main className={clsx(styles.Dashboard, roboto.variable)}>
      <Menu />
      <div className={clsx(styles.wrap)}>asdasdsazxchgzxvcghjvzxc</div>
    </main>
  );
}
