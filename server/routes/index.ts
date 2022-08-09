export default [
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
