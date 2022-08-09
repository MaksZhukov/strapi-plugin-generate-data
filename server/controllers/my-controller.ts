export default ({ strapi }) => ({
	flush(ctx) {
		const { contentType } = ctx.params;
		return strapi.entityService.deleteMany(contentType);
	},
	async upload(ctx) {
		const data = ctx.request.body;

		let obj = {};
		try {
			await Promise.all(
				Object.keys(data).map(async (key) => {
					let response = await Promise.all(
						data[key].map((urls) =>
							Promise.all(
								urls.map((url) =>
									strapi
										.plugin('generate-data')
										.service('myService')
										.uploadToLibrary(url)
								)
							)
						)
					);
					obj[key] = response;
				})
			);
		} catch (err) {
			console.log(err);
		}
		return obj;
	},
});
