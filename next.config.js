/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['/public/mainImage.jpg', '/public/loginBackground.jpg']
	}
};

module.exports = nextConfig;
