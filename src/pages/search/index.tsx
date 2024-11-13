import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";

// context 매개변수에는 현재 브라우저로부터 받은 요청의 모든 요청이 담기게 된다.
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const q = context.query.q;
    const books = await fetchBooks(q as string);
    
    return {
        props: {
            books
        }
    }
}

export default function Page({ books }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <div>
        {books.map((book) => <BookItem key={book.id} {...book} />)}
    </div>
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}