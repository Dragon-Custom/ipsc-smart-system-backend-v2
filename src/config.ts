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
		encrypt: {
			passwordEncryptionKey: string;
		};
		passwordOptions?: IsStrongPasswordOptions;
	};
}

import { IsStrongPasswordOptions } from "class-validator";
import config from "../server.config";
export default config as typeof config;
