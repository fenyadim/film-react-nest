import { Test, TestingModule } from '@nestjs/testing'
import { CreateOrderDto } from './dto/order.dto'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

describe('OrderController', () => {
  let controller: OrderController
  let service: OrderService

  const mockOrderService = {
    createOrder: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile()

    controller = module.get<OrderController>(OrderController)
    service = module.get<OrderService>(OrderService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('createOrder', () => {
    it('should create an order successfully', async () => {
      const mockOrderDto: CreateOrderDto = {
        email: 'test@example.com',
        phone: '+71234567890',
        tickets: [
          {
            id: 'c2260f3b-6ca0-453f-f379-96ffa676089d',
            film: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
            session: '95ab4a20-9555-4a06-bfac-184b8c53fe70',
            daytime: '2023-05-29T10:30:00.001Z',
            row: 2,
            seat: 5,
            price: 350,
            day: '29 мая',
            time: '10:30',
          },
        ],
      }

      const mockResponse = {
        total: 1,
        items: [
          {
            ...mockOrderDto.tickets[0],
          },
        ],
      }

      mockOrderService.createOrder.mockResolvedValue(mockResponse)

      const result = await controller.createOrder(mockOrderDto)

      expect(result).toEqual(mockResponse)
      expect(service.createOrder).toHaveBeenCalledWith(mockOrderDto.tickets)
    })

    it('should handle empty tickets array', async () => {
      const mockOrderDto: CreateOrderDto = {
        email: 'test@example.com',
        phone: '+71234567890',
        tickets: [],
      }

      const mockResponse = {
        total: 0,
        items: [],
      }

      mockOrderService.createOrder.mockResolvedValue(mockResponse)

      const result = await controller.createOrder(mockOrderDto)

      expect(result).toEqual(mockResponse)
      expect(service.createOrder).toHaveBeenCalledWith([])
    })

    it('should handle multiple tickets', async () => {
      const mockOrderDto: CreateOrderDto = {
        email: 'test@example.com',
        phone: '+71234567890',
        tickets: [
          {
            id: 'c2260f3b-6ca0-453f-f379-96ffa676089d',
            film: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
            session: '95ab4a20-9555-4a06-bfac-184b8c53fe70',
            daytime: '2023-05-29T10:30:00.001Z',
            row: 2,
            seat: 5,
            price: 350,
            day: '29 мая',
            time: '10:30',
          },
          {
            id: 'ee261ff4-dc3a-cea9-d4f5-3aeb22e1abac',
            film: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
            session: '95ab4a20-9555-4a06-bfac-184b8c53fe70',
            daytime: '2023-05-29T10:30:00.001Z',
            row: 2,
            seat: 6,
            price: 350,
            day: '29 мая',
            time: '10:30',
          },
        ],
      }

      const mockResponse = {
        total: 2,
        items: [
          {
            ...mockOrderDto.tickets[0],
          },
          {
            ...mockOrderDto.tickets[1],
          },
        ],
      }

      mockOrderService.createOrder.mockResolvedValue(mockResponse)

      const result = await controller.createOrder(mockOrderDto)

      expect(result).toEqual(mockResponse)
      expect(service.createOrder).toHaveBeenCalledWith(mockOrderDto.tickets)
    })
  })
})
