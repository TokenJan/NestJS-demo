import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './orders/order.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommonModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
