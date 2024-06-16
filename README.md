# This is the next generation of IPSC Smart System Backend

## Installation
### Requirement:
- [x] MySQL
- [x] Node.js

### Steps:
1. Clone the repository
2. Install dependencies using `npm install`
3. Create a MySQL database.
4. Update the `server.config.ts` file with your database credentials.
	template: 
	```typescript
	import { Config } from "src/config";
	const config: Config = {
		database: {
			database: "",
			username: "",
			password: "",
			host: "",
			port: 0,
		},
	};
	export default config;
	```
5. Run `npm run build` to build the project.
6. Run `npm run start:prod` to start the server.