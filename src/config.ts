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
			imageStoragePath: string;
			imageMaxBytes: number;
		};
	};
	security: {
		encrypt: {
			passwordEncryptionKey: string;
		};
		passwordOption?: IsStrongPasswordOptions;
	};
}

import { IsStrongPasswordOptions } from "class-validator";
import config from "../server.config";
export default config as typeof config;
