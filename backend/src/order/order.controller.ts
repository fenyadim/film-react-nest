import { Body, Controller, Post } from '@nestjs/common'
import { CreateOrderDto } from './dto/order.dto'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    return await this.orderService.createOrder(dto.tickets)
  }
}
