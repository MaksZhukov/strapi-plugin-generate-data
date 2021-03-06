export default [
	{
		method: 'GET',
		path: '/',
		handler: 'myController.index',
		config: {
			policies: [],
			auth: false,
		},
	},
	{
		method: 'POST',
		path: '/flush/:contentType',
		handler: 'myController.flush',
		config: {
			policies: [],
			auth: false,
		},
	},
	{
		method: 'POST',
		path: '/upload',
		handler: 'myController.upload',
		config: {
			policies: [],
			auth: false,
		},
	},
];
