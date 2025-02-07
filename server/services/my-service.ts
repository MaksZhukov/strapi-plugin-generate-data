import axios from 'axios';
import fs from 'fs';
import os from 'os';
import { Agent } from 'https';
import stream from 'stream';
import path from 'path';
import util from 'util';
import mime from 'mime-types';

const dir = os.tmpdir();

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
			httpsAgent: new Agent({ rejectUnauthorized: false })
		});

		const imageName = result.request.path.split('/').pop();

		const filePath = `${dir}/${new Date().getTime()}-${imageName}`;

		const file = fs.createWriteStream(filePath);
		const finished = util.promisify(stream.finished);
		result.data.pipe(file);
		await finished(file);
		const image = await this.upload(filePath);
		return image;
	},

	async upload(filePath) {
		const stats = (await this.getFileDetails(filePath)) as any;
		const fileName = path.parse(filePath).base;

		const res = await strapi.plugins.upload.services.upload.upload({
			data: {
				fileInfo: {
					name: fileName
				}
			},
			files: { filepath: filePath, size: stats.size, mimetype: mime.lookup(fileName) }
		});

		await this.deleteFile(filePath);
		return res[0];
	}
});
