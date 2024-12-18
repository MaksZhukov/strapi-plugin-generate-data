import fs from 'fs';
import path from 'path';

const validateName = (name: string, countFiles: number) => {
	const [number, ext] = name.split('.');
	return +number <= countFiles;
};

export default ({ strapi }) => ({
	flush(ctx) {
		const { contentType } = ctx.params;
		return strapi.db.query(contentType).deleteMany();
	},
	async create(ctx) {
		const { contentType } = ctx.params;
		const { data, status } = ctx.request.body;
		return data.map((item) => {
			return strapi.documents(contentType).create({
				data: item,
				status
			});
		});
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
			return new ctx.internalServerError('error');
		}
		return obj;
	},
	getVideos(ctx) {
		const { name } = ctx.params;
		if (validateName(name, 10)) {
			ctx.set('Content-Type', 'video/mp4');
			return fs.readFileSync(
				path.resolve(__dirname, '..', '..', 'public') + path.normalize(`/${name}`)
			);
		}
	},
	getAudios(ctx) {
		const { name } = ctx.params;
		if (validateName(name, 5)) {
			ctx.set('Content-Type', 'audio/wav');
			return fs.readFileSync(
				path.normalize(
					path.resolve(__dirname, '..', '..', 'public') + path.normalize(`/${name}`)
				)
			);
		}
	},
	getFiles(ctx) {
		const { name } = ctx.params;
		if (validateName(name, 5)) {
			ctx.set('Content-Type', 'text/json');
			return fs.readFileSync(
				path.normalize(
					path.resolve(__dirname, '..', '..', 'public') + path.normalize(`/${name}`)
				)
			);
		}
	}
});
