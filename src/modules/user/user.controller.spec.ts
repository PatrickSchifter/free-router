import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('UserController', () => {
  let app: INestApplication;
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /user', () => {
    it('should create a user', async () => {
      const createUserDto = { name: 'Test User' };
      const createdUser = { id: '1', name: 'Test User' };
      (userService.create as jest.Mock).mockResolvedValue({
        statusCode: 201,
        message: 'User created successfully',
        data: createdUser,
      });

      await request(app.getHttpServer())
        .post('/user')
        .send(createUserDto)
        .expect(201)
        .expect({
          statusCode: 201,
          message: 'User created successfully',
          data: createdUser,
        });

      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });
  });
});
