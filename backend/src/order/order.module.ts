import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Films, Schedules } from 'src/films/films.entity'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
  imports: [TypeOrmModule.forFeature([Films, Schedules])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
