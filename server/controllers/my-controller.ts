import axios from 'axios';
import FormData from 'form-data';

export default ({ strapi }) => ({
	index(ctx) {
		ctx.body = strapi
			.plugin('generate-data')
			.service('myService')
			.getWelcomeMessage();
	},
	flush(ctx) {
		const { contentType } = ctx.params;
		return strapi.entityService.deleteMany(contentType);
	},
	async upload(ctx) {
		const url = strapi.config.get('server.url');
		const port = strapi.config.get('server.port');
		const host = strapi.config.get('server.host');
		const data = ctx.request.body;
		let obj = {};
		await Promise.all(
			Object.keys(data).map(async (key) => {
				let imagesResponse = await Promise.all(
					data[key].map((urls) =>
						Promise.all(
							urls.map((url) =>
								axios(url, { responseType: 'arraybuffer' })
							)
						)
					)
				);
				const uploadedData = await Promise.all(
					imagesResponse.map(async (images) => {
						let formData = new FormData();

						images.forEach(async (result) => {
							let imageName = result.request.path
								.split('/')
								.pop();
							formData.append('files', result.data, imageName);
						});
						const response = await axios.post(
							host === '0.0.0.0'
								? `http://localhost:${port}api/upload`
								: url,
							formData
						);
						return response.data;
					})
				);
				obj[key] = uploadedData;
				return uploadedData;
			})
		);
		return obj;
	},
});
