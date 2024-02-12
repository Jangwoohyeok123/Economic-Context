import clsx from "clsx";
import styles from "./Header.module.scss";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import Link from "next/link";

interface HeaderProps {
  children: React.ReactNode;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--pointFont",
});

export default function Header() {
  const router = useRouter();

  return (
    <header className={clsx(styles.Header, poppins.variable)}>
      {router.pathname === "/" ? (
        <nav className={clsx(styles.mainNav)}>
          <Link href="/">EconomicContext</Link>
          <div className={clsx(styles.users)}>
            <span>Bell</span>
            <Link href="/dashboard">MyContext</Link>
            <span>Login</span>
          </div>
        </nav>
      ) : (
        <nav className={clsx(styles.dashBoardNav)}>
          <Link href="/">EconomicContext</Link>
          <div className={clsx(styles.users)}>
            <Link href="/dashboard">MyContext</Link>
            <span>Login</span>
          </div>
        </nav>
      )}
    </header>
  );
}
