export interface Config {
	database: {
		host: string;
		port: number;
		username: string;
		password: string;
		database: string;
	};
	ipsc: {};
}

import config from "../server.config";
export default config as typeof config;
