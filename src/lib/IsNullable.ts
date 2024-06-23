/// https://stackoverflow.com/questions/61211664/how-to-allow-null-but-forbid-undefined
import { ValidationOptions, ValidateIf } from "class-validator";
export function IsNullable(validationOptions?: ValidationOptions) {
	return ValidateIf((_object, value) => value !== null, validationOptions);
}
