import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WebhookRepository {
  constructor(database: PrismaService) {}
  async create() {
    return {};
  }
}
