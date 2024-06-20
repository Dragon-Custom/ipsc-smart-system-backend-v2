import { Test, TestingModule } from "@nestjs/testing";
import { ShootersService } from "./shooters.service";

describe("ShootersService", () => {
	let service: ShootersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ShootersService],
		}).compile();

		service = module.get<ShootersService>(ShootersService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
