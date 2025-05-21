export default [
    {
		method: 'GET',
		path: '/content-types',
		handler: 'myController.getContentTypes',
		config: {
			policies: [],
			auth: false
		}
	},
    {
		method: 'GET',
		path: '/collection-types/:contentType',
		handler: 'myController.getCollection',
		config: {
			policies: [],
			auth: false
		}
	},
	{
		method: 'POST',
		path: '/flush/:contentType',
		handler: 'myController.flush',
		config: {
			policies: [],
			auth: false
		}
	},
	{
		method: 'POST',
		path: '/create/:contentType',
		handler: 'myController.create',
		config: {
			policies: [],
			auth: false
		}
	},
	{
		method: 'POST',
		path: '/upload',
		handler: 'myController.upload',
		config: {
			policies: [],
			auth: false
		}
	},
	{
		method: 'GET',
		path: '/videos/:name',
		handler: 'myController.getVideos',
		config: {
			policies: [],
			auth: false
		}
	},
	{
		method: 'GET',
		path: '/audios/:name',
		handler: 'myController.getAudios',
		config: {
			policies: [],
			auth: false
		}
	},
	{
		method: 'GET',
		path: '/files/:name',
		handler: 'myController.getFiles',
		config: {
			policies: [],
			auth: false
		}
	}
];
