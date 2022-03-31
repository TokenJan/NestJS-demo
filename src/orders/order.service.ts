import { Injectable } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { OrderEntity, OrderEntityDefinition } from './order.entity';
import { InjectConnections, InjectModel } from 'nestjs-ottoman';
import { ModelTypes, Ottoman, SearchConsistency } from 'ottoman';


@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderEntityDefinition.name)
    private OrderModel: ModelTypes<OrderEntity, OrderEntity>, // inject ottoman Model object
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const newOrder = await this.OrderModel.create(createOrderDto);
    return newOrder;
  }

  async findById(orderId: string) {
    return this.OrderModel.findById(orderId);
  }

  async updateById(orderId: string, updateOrderDto: UpdateOrderDto) {
    return this.OrderModel.updateById(orderId, updateOrderDto);
  }

  async removeById(orderId: string) {
    this.OrderModel.removeById(orderId);
  }

}
