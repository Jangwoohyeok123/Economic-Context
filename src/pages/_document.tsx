import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
// 배포이후 작업할 것이 있음
/* 
  서버에만 렌더링되고 html 문서의 구조를 정의하는 파일
  서버사이드 렌더링시 실행되는 컴포넌트다.
*/
