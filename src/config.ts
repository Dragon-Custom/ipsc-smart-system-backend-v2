export interface Config {
	database: {
		host: string;
		port: number;
		username: string;
		password: string;
		database: string;
	};
}

import config from "../server.config";
export default config as Config;
