import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Film } from '../films/schemas/Film.schema'
import { Tickets } from './dto/order.dto'

@Injectable()
export class OrderService {
  constructor(@InjectModel(Film.name) private filmsModel: Model<Film>) {}

  async createOrder(tickets: Tickets[]) {
    for (const order of tickets) {
      const film = await this.filmsModel.findOne({ id: order.film })
      if (!film) {
        throw new BadRequestException('Фильм не найден')
      }
      const session = film.schedule.find((s) => s.id === order.session)
      if (!session) {
        throw new BadRequestException('Сеанс не найден')
      }
      if (order.row > session.rows || order.seat > session.seats) {
        throw new BadRequestException('Некорректное значение ряда или места')
      }
      const orderSeat = `${order.row}:${order.seat}`
      if (session.taken.includes(orderSeat)) {
        throw new BadRequestException('Это место уже занято')
      }
      session.taken.push(orderSeat)
      film.save()
    }

    return {
      total: tickets.length,
      items: tickets,
    }
  }
}
