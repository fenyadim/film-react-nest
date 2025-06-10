import { Test, TestingModule } from '@nestjs/testing'
import { FilmsController } from './films.controller'
import { FilmsService } from './films.service'

describe('FilmsController', () => {
  let controller: FilmsController
  let service: FilmsService

  const mockFilmsService = {
    getFilms: jest.fn(),
    getOneFilm: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile()

    controller = module.get<FilmsController>(FilmsController)
    service = module.get<FilmsService>(FilmsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getFilms', () => {
    it('should return an array of films', async () => {
      const mockFilms = {
        total: 1,
        items: [
          {
            id: '1',
            rating: 4.5,
            director: 'Test Director',
            tags: ['Action'],
            title: 'Test Film',
            about: 'Test About',
            description: 'Test Description',
            image: '/test.jpg',
            cover: '/test-cover.jpg',
          },
        ],
      }

      mockFilmsService.getFilms.mockResolvedValue(mockFilms)

      const result = await controller.getFilms()
      expect(result).toEqual(mockFilms)
      expect(service.getFilms).toHaveBeenCalled()
    })
  })

  describe('getOneFilm', () => {
    it('should return schedule for a specific film', async () => {
      const mockSchedule = {
        total: 1,
        items: [
          {
            id: '1',
            daytime: new Date(),
            hall: 1,
            rows: 10,
            seats: 20,
            price: 500,
            taken: '',
          },
        ],
      }

      const filmId = 'test-film-id'
      mockFilmsService.getOneFilm.mockResolvedValue(mockSchedule)

      const result = await controller.getOneFilm(filmId)
      expect(result).toEqual(mockSchedule)
      expect(service.getOneFilm).toHaveBeenCalledWith(filmId)
    })
  })
})
