import "@/styles/Global.scss";
import "@/styles/Reset.scss";

import type { AppProps } from "next/app";
import Header from "../components/header/Header";
import { Poppins, Roboto } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

// Notice that the Box component doesn't take any props, but we are trying to pass a children prop to it.
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Component {...pageProps} />
      {/* <Menu /> */}
    </QueryClientProvider>
  );
}

// react 공식문서는 props 와 component 의 합성을 권장한다. 다음은 합성 도중 children 을 prop 으로 전달하는 과정을 생략해 발생한 타입
