const presets = [
	[
		"@babel/env",
		{
			useBuiltIns: 'usage',
			corejs: 3,
			// modules: false 
		},
	],
	["@babel/preset-typescript"]
];

module.exports = {
	presets,

};