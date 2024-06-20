import { Test } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from "src/entities";

describe("UsersController", () => {
	let usersController: UserController;
	let usersService: UserService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [UserController],
			providers: [UserService],
		}).compile();

		usersService = moduleRef.get<UserService>(UserService);
		usersController = moduleRef.get<UserController>(UserController);
	});

	describe("findAll", () => {
		it("should return an array of users", async () => {
			const result: User[] = [
				{
					id: 1,
					nickname: "User 1",
					email: "user1@example.com",
					encryptedPassword:
						usersService.encryptePassword("password1"),
					createdAt: new Date(),
					isActive: true,
					isBanned: false,
					adminOfTeam: null,
					designedStages: null,
					ownsTeam: null,
					shooterProfile: null,
					stuffOfMatches: null,
				},
				{
					id: 2,
					nickname: "User 2",
					email: "user2@example.com",
					encryptedPassword:
						usersService.encryptePassword("password2"),
					createdAt: new Date(),
					isActive: true,
					isBanned: false,
					adminOfTeam: null,
					designedStages: null,
					ownsTeam: null,
					shooterProfile: null,
					stuffOfMatches: null,
				},
			];
			jest.spyOn(usersService, "findAll").mockImplementation(() =>
				Promise.resolve(result),
			);

			expect(await usersController.findAll()).toBe(result);
		});
	});
});
