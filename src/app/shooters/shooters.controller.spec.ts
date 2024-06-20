import { Test, TestingModule } from "@nestjs/testing";
import { ShootersController } from "./shooters.controller";
import { ShootersService } from "./shooters.service";

describe("ShootersController", () => {
	let controller: ShootersController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ShootersController],
			providers: [ShootersService],
		}).compile();

		controller = module.get<ShootersController>(ShootersController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
