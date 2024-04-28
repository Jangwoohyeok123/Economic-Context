/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		formats: ['image/avif', 'image/webp'],
		domains: ['/public/mainImage.jpg', '/public/loginBackground.jpg']
	},
	// webpack 설정: SVG 파일을 React 컴포넌트로 변환하기 위해 @svgr/webpack 로더를 설정합니다.
	// 이 설정은 JSX 파일 내에서 SVG를 직접 import하여 컴포넌트로 사용할 수 있게 해줍니다.
	webpack: config => {
		config.module.rules.push({
			test: /\.svg$/i, // SVG 파일에 대한 정규 표현식
			issuer: /\.[jt]sx?$/, // .js, .jsx, .ts, .tsx 파일에서 SVG 파일을 처리
			use: ['@svgr/webpack'] // SVG를 React 컴포넌트로 변환하는 로더
		});
		return config;
	}
};

module.exports = nextConfig;
