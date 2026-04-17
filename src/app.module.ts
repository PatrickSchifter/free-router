import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { UserModule } from './modules/user/user.module';
//Prisma configured

@Module({
  imports: [PrismaModule, WebhookModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
