import { Test, TestingModule } from '@nestjs/testing';
import { ShooterResolver } from './shooter.resolver';
import { ShooterService } from './shooter.service';

describe('ShooterResolver', () => {
  let resolver: ShooterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShooterResolver, ShooterService],
    }).compile();

    resolver = module.get<ShooterResolver>(ShooterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
