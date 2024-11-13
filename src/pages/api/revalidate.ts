// onDemand ISR 방식 학습하기 위함
/**
 * ISR을 적용하기 어려운 페이지
: 시간과는 관계없이 사용자의 행동에 따라 데이터가 업데이트되는 페이지의 경우

시간을 기반으로 페이지를 업데이트 시키는 방식이 아닌, 요청을 받을 때마다 페이지를 다시 생성하는 OnDemand ISR 방식을 이용하면 불필요한 재생성이 일어나지 않는다.
revalidate 요청을 직접 트리거링할 수 있다.

대부분의 케이스 커버 가능하여 대부분의 Next.js 페이지는 이 방식으로 제작되어있다.
 */

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await res.revalidate("/");
        return res.json({revalidate: true});
    } catch {
        res.status(500).send("Revalidation Failed");
    }
}