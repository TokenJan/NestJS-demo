import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Schema } from 'ottoman';

const orderSchema = new Schema(
  {
    user: { userId: { type: String } },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

orderSchema.index.findN1qlByStatus = {
  by: ['status'],
  type: 'n1ql',
};

export const OrderEntityDefinition = {
  name: 'Order',
  schema: orderSchema,
};

export class OrderUser {
  @IsOptional()
  @IsString()
  userId?: string;
}

export class OttomanEntity {
  id: string;
  _type: string;
}

export class OttomanEntityWithTimestamp extends OttomanEntity {
  createdAt: string;
  updatedAt: string;
}

export class OrderEntity extends OttomanEntityWithTimestamp {
  @ValidateNested()
  @Type(() => OrderUser)
  user?: OrderUser;

  @IsString()
  status: string;
}