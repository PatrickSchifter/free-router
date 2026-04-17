import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly database: PrismaService) {}

  async create({ name }: { name: string }) {
    return await this.database.user.create({ data: { name } });
  }

  async findById(id: string) {
    return await this.database.user.findFirst({ where: { id } });
  }
}
