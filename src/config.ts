import { IsStrongPasswordOptions } from "class-validator";
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
	api: {
		passwordOption?: IsStrongPasswordOptions & {
			encryptSecret: string;
		};
		jwt: {
			expiresIn: string;
			/**
			 * expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
			 */
			jwtSecret: string;
		};
	};
}

import config from "../server.config";
export default config as typeof config;
