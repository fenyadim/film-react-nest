import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Film } from './schemas/Film.schema'

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private filmsModel: Model<Film>) {}

  async getFilms() {
    const films = await this.filmsModel.find().select('-schedule -_id')

    return {
      total: films.length,
      items: films,
    }
  }

  async getOneFilm(id: string) {
    const film = await this.filmsModel.findOne({ id })

    return {
      total: film.schedule.length,
      items: film.schedule,
    }
  }
}
