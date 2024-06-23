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
		password: {
			strongPasswordCriteria?: IsStrongPasswordOptions;
			passwordEncryptionSecret: string;
		};
	};
}

import { IsStrongPasswordOptions } from "class-validator";
import config from "../server.config";
export default config as typeof config;
