import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";

// 동적 경로에 SSG 방식 적용할 때, 아래와 같은 path가 있음을 getStaticPath 함수로 미리 고지해줘야함.
export const getStaticPaths = () => {
    return {
        paths: [
            {params: {id: "1"}},
            {params: {id: "2"}},
            {params: {id: "3"}},
        ],
        fallback: true, //예외 상황에 대비하는 대비책, 보험
        // false: Not Found로 처리
        // blocking: 실시간 사전렌더링(Like SSR), 이후 요청에는 SSG처럼 동작
        // true: 즉시 생성, props 없는 페이지만 미리 반환(로딩 연출 가능), Props 따로 반환
    }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const id = context.params!.id;
    const book = await fetchOneBook(Number(id));

    if (!book) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            book,
        }
    }
}

export default function Page({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();

    if (router.isFallback) return "로딩 중입니다.";

    if (!book) return "문제가 발생했습니다. 다시 시도하세요.";
    
    const {title, subTitle, description, author, publisher, coverImgUrl} = book;

    return <div className={style.container}>
        <div className={style.cover_img_container} style={{backgroundImage: `url("${coverImgUrl}")`}}>
            <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>{author} | {publisher}</div>
        <div className={style.description}>{description}</div>
    </div>
}