/**
 * axios with a custom config.
 */

import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.STRAPI_ADMIN_BACKEND_URL
});
instance.interceptors.request.use(
	async (config) => {
		config.headers['Authorization'] =
			`Bearer ${JSON.parse(sessionStorage.getItem('jwtToken') || '')}`;
		config.headers['Accept'] = 'application/json';
		config.headers['Content-Type'] = 'application/json';

		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => response,
	(error) => {
		// whatever you want to do with the error
		if (error.response?.status === 401) {
			//   auth.clearAppStorage();
			//   window.location.reload();
		}

		throw error;
	}
);

export default instance;
