import { Test, TestingModule } from "@nestjs/testing";
import { ShooterService } from "./shooter.service";

describe("ShooterService", () => {
	let service: ShooterService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ShooterService],
		}).compile();

		service = module.get<ShooterService>(ShooterService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
