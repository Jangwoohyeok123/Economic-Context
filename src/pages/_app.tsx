import "@/styles/Global.scss";
import "@/styles/Reset.scss";

import type { AppProps } from "next/app";

// 페이지 이동마다 실행되는 컴포넌트로 레이아웃 역할을 한다.
// className 을 통해 실행후 동적으로 css 변수 설정하는 것
// 디렉토리이름을 변경하거나 파일명을 변경하는 것은 불가능하다.
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
