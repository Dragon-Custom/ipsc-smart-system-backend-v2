export interface Config {
	database: {
		host: string;
		port: number;
		username: string;
		password: string;
		database: string;
	};
	server: {
		port: number;
		imageService: {
			/**
			 *   In Bytes
			 */
			maxSize: number;
			path: string;
		};
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
