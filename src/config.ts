export interface Config {
	database: {
		host: string;
		port: number;
		username: string;
		password: string;
		database: string;
	};
	ipsc: {};
	server: {
		port: number;
	};
	security: {
		passwordSalt: string;
	};
}

import config from "../server.config";
export default config as typeof config;
