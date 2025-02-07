import fs from 'fs';
import path from 'path';

const validateName = (name: string, countFiles: number) => {
	const [number, ext] = name.split('.');
	return +number <= countFiles;
};

// Helper function to retry uploads with a backoff mechanism
const retryUpload = async (strapi, url, retries = 5) => {
	for (let attempt = 1; attempt <= retries; attempt++) {
		try {
			return await strapi.plugin('generate-data').service('myService').uploadToLibrary(url);
		} catch (err) {
			console.warn(`Upload failed (attempt ${attempt}) for URL: ${url}`, err);
			if (attempt === retries) {
				console.error(`Max retries reached for URL: ${url}`);
				return null; // Return null to indicate a failure
			}
		}
		// wait before trying again
		await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
	}
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
						data[key].map(async (urls) =>
							Promise.all(urls.map(async (url) => await retryUpload(strapi, url)))
						)
					);
					// Filter out any failed uploads (null responses)
					obj[key] = response.map((urlResponses) =>
						urlResponses.filter((res) => res !== null)
					);
				})
			);
		} catch (err) {
			console.error('Unexpected error during upload:', err);
			return ctx.internalServerError('An error occurred during upload processing.');
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
