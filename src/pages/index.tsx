//CSS 모듈
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// 약속된 이름의 함수를 만들어서 내보내주면 SSR로 동작하도록 설정됨
export const getServerSideProps = async() => {
  //컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수.
  // 이 함수는 서버 측에서만 실행 됨
  // console.log("서버사이드프롭스")
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(), 
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    }
  }
};

//서버에서 1번, 브라우저에서 1번 실행됨 (사전 렌더링, 하이드레이션 과정)
export default function Home({ allBooks, recoBooks }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // InferGetServerSidePropsType: SSR로 받은 데이터의 타입을 추론해주는 Nextjs 내장 타입 

  //window.location < 서버사이드에서는 window 객체가 없으므로 오류 발생함.
  //window 객체를 사용하고 싶다면 아래처럼 useEffect를 사용해야함.
  // useEffect(() => {
  //   console.log(window)
  // }, [])

  return (
    <div>
      <section className={style.container}>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => <BookItem key={book.id} {...book} />)}
      </section>
      <section className={style.container}>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => <BookItem key={book.id} {...book} />)}
        </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}