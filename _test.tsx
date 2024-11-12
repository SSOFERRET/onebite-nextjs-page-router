import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const onClickButton = () => {
    router.push("/test");
    //router.replace("/test") 뒤로 가기 방지
    //router.back() 뒤로 가기
  }

  // 프로그래메틱하게 이동하는 페이지에 대해서도 pre-fetching을 시키고 싶다면 prefetch 메소드로 설정 가능하다.
  useEffect(() => {
    router.prefetch("/test");
  }, []);

  return (
    <>
      <header>
        <Link href="/">index</Link>
        &nbsp;
        {/* Link 요소에서 prefetch 기능을 해제하고 싶다면 아래와 같이 설정 가능하다. */}
        <Link href="/search" prefetch={false}>search</Link>
        &nbsp;
        <Link href="/book/1">book/1</Link>
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  )
}
