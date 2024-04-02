/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		formats: ['image/avif', 'image/webp'],
		domains: ['/public/mainImage.jpg', '/public/loginBackground.jpg']
	}
};

module.exports = nextConfig;
