const presets = [
	[
		"@babel/env",
		{
			useBuiltIns: 'usage',
			corejs: 3,
			// modules: false 
		},
	],
];

module.exports = {
	presets,

};