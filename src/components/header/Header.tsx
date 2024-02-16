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

  // 나중에 조건부 렌더링 컴포넌트 분리
  return (
    <header className={clsx(styles.Header, poppins.variable)}>
      {router.pathname !== "/dashboard" ? (
        <nav className={clsx(styles.mainNav)}>
          <Link href="/">EconomicContext</Link>
          <div className={clsx(styles.users)}>
            <span>Bell</span>
            <Link href="/dashboard">MyContext</Link>
            <Link href="/login">Login</Link>
          </div>
        </nav>
      ) : (
        <nav className={clsx(styles.dashBoardNav)}>
          <Link href="/">EconomicContext</Link>
          <div className={clsx(styles.users)}>
            <Link href="/dashboard">MyContext</Link>
            <Link href="/login">Login</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
