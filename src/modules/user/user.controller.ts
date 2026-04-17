import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDTO } from './user.dto';

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async create(@Body() body: UserCreateDTO) {
    return await this.service.create({ name: body.name });
  }
}
