export interface Config<T> {
	database: {
		host: string;
		port: number;
		username: string;
		password: string;
		database: string;
	};
	ipsc: {
		division: T[];
	};
}

import config from "../server.config";
export default config as typeof config;
