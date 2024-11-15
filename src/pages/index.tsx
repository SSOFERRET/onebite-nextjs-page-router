import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head";

export const getStaticProps = async() => {
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(), 
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
    // revalidate: 60,
  }
};

export default function Home({ allBooks, recoBooks }: InferGetStaticPropsType<typeof getStaticProps>) {
  useEffect(() => {
    async function triggerRevalidation() {
      try {
        const response = await fetch('/api/revalidate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ path: '/' }),
        });

        const data = await response.json();
        if (data.revalidated) {
          console.log('Revalidation triggered successfully');
        } else {
          console.log('Failed to trigger revalidation');
        }
      } catch (error) {
        console.error('Error triggering revalidation:', error);
      }
    }

    // 컴포넌트가 마운트될 때 자동으로 호출
    triggerRevalidation();
  }, []); // 빈 배열로 설정해 한 번만 실행되도록 함
  
  return (
    <>
      <Head>
        <title>한 입 북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta property="og:description" content="한입북스에 등록된 도서들을 만나보세요." />
      </Head>
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
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}