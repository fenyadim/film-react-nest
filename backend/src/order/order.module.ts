import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Film, FilmSchema } from 'src/films/schemas/Film.schema'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Film.name,
        schema: FilmSchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
