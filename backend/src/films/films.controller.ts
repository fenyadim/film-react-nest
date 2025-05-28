import { Controller, Get, Param } from '@nestjs/common'
import { FilmsService } from './films.service'

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getFilms() {
    return this.filmsService.getFilms()
  }

  @Get(':id/schedule')
  async getOneFilm(@Param('id') id: string) {
    return this.filmsService.getOneFilm(id)
  }
}
