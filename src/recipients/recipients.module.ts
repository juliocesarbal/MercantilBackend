import { Module } from '@nestjs/common';
import { RecipientsController } from './recipients.controller';
import { RecipientsService } from './recipients.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [RecipientsController],
  providers: [RecipientsService, PrismaService],
  exports: [RecipientsService],
})
export class RecipientsModule {}
