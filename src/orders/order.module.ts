import { Module } from '@nestjs/common';
import { CouchbaseModule } from 'nestjs-ottoman';

import { OrderEntityDefinition } from './order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [CouchbaseModule.forFeature([OrderEntityDefinition], 'orders')],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
