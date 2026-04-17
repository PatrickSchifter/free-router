import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { created } from 'src/common/helpers/response.helper';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create({ name }: { name: string }) {
    const user = await this.repository.create({ name });

    return created({ data: user, entityName: 'User' });
  }
}
