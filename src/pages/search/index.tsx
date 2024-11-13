import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import { useRouter } from "next/router";

//GetStaticPropsContext 객체는 query 프로퍼티가 없다. (아무래도 빌드 시에 알아낼 방도는 없다)
//SSG로는 Search 처럼 querystring을 받아서 fetch 받는 기능 구현 불가
//그럼 어떻게 해? => SSR로 동작 시키거나, 기존 React 앱처럼 브라우저에서 처리하도록 작업.
// export const getStaticProps = async (context: GetStaticPropsContext) => {
//     const q = context.query.q;
//     const books = await fetchBooks(q as string);
    
//     return {
//         props: {
//             books
//         }
//     }
// }

export default function Page() {
    const [books, setBooks] = useState<BookData[]>([]);
    const router = useRouter();
    const q = router.query.q;

    const fetchSearchResult = async() => {
        const data = await fetchBooks(q as string);
        setBooks(data);
    }

    useEffect(() => {
        if (q) {
            fetchSearchResult();
        }
    }, [q])

    return <div>
        {books.map((book) => <BookItem key={book.id} {...book} />)}
    </div>
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}