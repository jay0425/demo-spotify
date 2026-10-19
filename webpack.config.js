const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
	const isProduction = argv.mode === "production";

	return {
		mode: isProduction ? "production" : "development", // 웹팩 모드 설정. 개발 상태, 배포 상태 번들링 나눠서 다르게 설정 가능.
		entry: path.resolve(__dirname, "src", "index.tsx"), // 어디서부터 모듈 번들링 시작할지 정해주는거. 프로젝트가 시작되는 파일을 지정한다.
		resolve: {
			extensions: [".tsx", ".ts", ".js"], //  import할 때 확장자를 생략해도 이 순서대로 찾아 준다는 뜻.
		},
		module: {
			rules: [
				// 어떤 규칙? 어떤 로더 사용해서 번들링할건데?
				// 다양한 파일 형식을 처리하기 위한 규칙을 정의.
				{
					test: /\.css$/i,
					use: ["style-loader", "css-loader"], // css 파일 처리
				},
				{
					test: /\.svg$/,
					use: [
						{
							loader: "@svgr/webpack", // 이미지 파일
							options: {
								icon: true,
							},
						},
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]?ver=[hash]",
								outputPath: "images",
							},
						},
					],
				},
				{
					test: /\.(png|jpg|gif|jpeg)$/, // 이미지 파일
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]?ver=[hash]", // 출력 파일명 형식.
								// 이미지 내용이 바뀌면 ?ver= 해시가 바뀌어 브라우저 캐시를 무효화하고 새 파일을 받게 함 (캐시 버스팅)
								outputPath: "images",
							},
						},
					],
				},
				{
					test: /\.(ts|js)x?$/, // .tsx 또는 .jsx 파일을 babel-loader를 통해 변환합니다.
					exclude: /node_modules/,
					use: [
						{
							loader: "babel-loader", // js와 ts로 변환.
						},
					],
				},
			],
		},
		output: {
			// 번들링된 파일이 저장될 위치와 이름을 지정함.
			path: path.resolve(__dirname, "dist"), // dist 파일에 번들링 해준거를 저장을 해달라.
			chunkFilename: "[name].js?ver=[hash]", // 그런 파일들 이름 어떻게 만들지.
			filename: "[name].js?ver=[hash]",
			publicPath: "/",
		},
		devtool: isProduction ? "source-map" : "inline-source-map", // 어떤 식으로 코드를 인코딩할지 셋팅.
		devServer: {
			port: 3000,
			open: true,
			hot: true,
			historyApiFallback: true,
		},
		optimization: {
			minimize: isProduction, // 어떻게 코드 압축할지. production 모드에서만 코드 압축
		},
		performance: {
			hints: false,
		},
		plugins: [
			// 빌드 프로세스를 도와주는 플러그입이다.
			new CleanWebpackPlugin(), // 이전 빌드 파일을 삭제한다.
			new HtmlWebpackPlugin({
				// Html 파일을 생성하고, 번들링된 js를 자동으로 포함시킨다.
				template: path.resolve(__dirname, "src", "index.html"), // 이거 만들어줘야 함.
			}),
			new Dotenv({
				// 환경 변수 파일을 로드한다.
				allowEmptyValues: true,
				systemvars: true,
			}),
		],
	};
};
