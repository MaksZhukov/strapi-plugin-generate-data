/**
 * axios with a custom config.
 */

import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.STRAPI_ADMIN_BACKEND_URL
});

export default instance;
