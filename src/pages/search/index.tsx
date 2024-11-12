import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import books from "@/mock/books.json";

export default function Page() {
    return <div>
        {books.map((book) => <BookItem key={book.id} {...book} />)}
    </div>
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}