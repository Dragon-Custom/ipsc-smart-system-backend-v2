import { Test, TestingModule } from "@nestjs/testing";
import { ShooterController } from "./shooter.controller";

describe("ShooterController", () => {
	let controller: ShooterController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ShooterController],
		}).compile();

		controller = module.get<ShooterController>(ShooterController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
