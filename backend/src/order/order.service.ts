import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Films, Schedules } from 'src/films/films.entity'
import { Repository } from 'typeorm'
import { Tickets } from './dto/order.dto'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Films)
    private filmsRepository: Repository<Films>,
    @InjectRepository(Schedules)
    private schedulesRepository: Repository<Schedules>,
  ) {}

  async createOrder(tickets: Tickets[]) {
    for (const order of tickets) {
      const film = await this.filmsRepository.findOne({
        where: {
          id: order.film,
        },
        relations: {
          schedule: true,
        },
      })
      if (!film) {
        throw new BadRequestException('Фильм не найден')
      }
      const session = await this.schedulesRepository.findOneBy({
        id: order.session,
      })
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
      if (!session.taken) {
        session.taken = orderSeat
      } else {
        const takenArr = session.taken.split(',')
        takenArr.push(orderSeat)
        session.taken = takenArr.join(',')
      }
      await this.schedulesRepository.save(session)
    }

    return {
      total: tickets.length,
      items: tickets,
    }
  }
}
