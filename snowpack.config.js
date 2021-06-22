module.exports = {
	mount: {
		public: "/",
		src: "/dist"
	},
	buildOptions: {
		baseUrl: "/bike-geo-dude"
	},
	plugins: ["@snowpack/plugin-react-refresh"]
}
