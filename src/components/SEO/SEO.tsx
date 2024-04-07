import Head from 'next/head';

interface SEO_Props {
	title: string;
	description: string;
}

export default function SEO({
	title,
	description = '내가 원하는 경제지표를 편리하게 관리하고, 나의 일지를 작성할 수 있습니다. 로그인으로 시작하세요.'
}: SEO_Props) {
	return (
		<Head>
			<title>{`Economic Context | ${title}page`}</title>
			<meta name='description' content={description} />
			<meta charSet='UTF-8' />
			<meta property='og:title' content='Economic Context : 경제지표를 더 쉽게 관리하자!' />
			<meta property='og:type' content='website' />
			<meta property='og:url' content={process.env.NEXT_PUBLIC_FRONT_URL} />
			<meta name='keywords' content='economic, EconomicContext, indicator'></meta>
		</Head>
	);
}
