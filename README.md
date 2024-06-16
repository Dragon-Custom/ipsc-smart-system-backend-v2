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
	//Define your divisions here and the types and values will be automatically generated.
	export const Divisions = [
		"Open",
		"Standard",
		"Production",
		"Production Optics",
	] as const;
	const config: Config<(typeof Divisions)[number]> = {
		database: {
			database: "",
			username: "",
			password: "",
			host: "",
			port: 0,
		},
		ipsc: {
			division: Object.values(Divisions),
		},
	};
	export default config;
	```
5. Run `npm run build` to build the project.
6. Run `npm run start:prod` to start the server.