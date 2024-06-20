export interface ErrorMessage {
	status: number;
	message: string;
	type: string;
	errors: [{ code: number; message: string }];
	errorCode: number;
	timestamp: string;
}
