/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
}

const dotenv = require('dotenv');
const path = require('path');

module.exports = (phase, { defaultConfig }) => {
	let develop = (process.env.BUILD_ENV !== undefined) ? process.env.BUILD_ENV : process.env.NODE_ENV;
	develop = (develop === 'development') ? 'staging' : develop;

	let production = (develop === 'production') ? false : true;
	dotenv.config({ path: path.resolve(__dirname, 'config/.env.' + develop) });

	return {
		...nextConfig,
		productionBrowserSourceMaps: production,
		env: {
			URL_WEB: process.env.URL_WEB,
			URL_API: process.env.URL_API,
			API_ENCRYPT: process.env.API_ENCRYPT
		}
	}
}