import axios from 'axios';
import fs from 'fs';
import stream from 'stream';
import path from 'path';
import util from 'util';
import mime from 'mime-types';

let dir = './tmp';

if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}

export default ({ strapi }) => ({
	getFileDetails(filePath) {
		return new Promise((resolve, reject) => {
			fs.stat(filePath, (err, stats) => {
				if (err) reject(err.message);
				resolve(stats);
			});
		});
	},

	deleteFile(filePath) {
		return new Promise((resolve, reject) => {
			fs.unlink(filePath, (err) => {
				if (err) reject(err.message);
				resolve('deleted');
			});
		});
	},

	async uploadToLibrary(imageByteStreamURL) {
		const result = await axios.get(imageByteStreamURL, {
			responseType: 'stream',
		});

		const imageName = result.request.path.split('/').pop();

		const filePath = `${dir}/${imageName}`;

		const file = fs.createWriteStream(filePath);
		const finished = util.promisify(stream.finished);
		result.data.pipe(file);
		await finished(file);
		const image = await this.upload(filePath, 'uploads');
		return image;
	},

	async upload(filePath, saveAs) {
		const stats = await this.getFileDetails(filePath);
		const fileName = path.parse(filePath).base;

		const res = await strapi.plugins.upload.services.upload.upload({
			data: { path: saveAs },
			files: {
				path: filePath,
				name: fileName,
				type: mime.lookup(filePath),
				size: stats.size,
			},
		});

		await this.deleteFile(filePath);
		return res[0];
	},
});
