import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Films } from './films.entity'

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Films)
    private filmsRepository: Repository<Films>,
  ) {}

  async getFilms() {
    const [items, total] = await this.filmsRepository.findAndCount()

    return {
      total,
      items,
    }
  }

  async getOneFilm(id: string) {
    const film = await this.filmsRepository.findOne({
      where: {
        id,
      },
      relations: {
        schedule: true,
      },
    })

    return {
      total: film.schedule.length,
      items: film.schedule,
    }
  }
}
