import { OmitType, PartialType } from '@nestjs/swagger';

import { OrderEntity } from './order.entity';

export class CreateOrderDto extends OmitType(OrderEntity, [
  'id',
  '_type',
  'createdAt',
  'updatedAt',
]) {}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}