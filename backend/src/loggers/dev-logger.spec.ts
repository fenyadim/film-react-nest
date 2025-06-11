import { Test, TestingModule } from '@nestjs/testing'
import { DevLogger } from './dev-logger'

describe('Dev logger', () => {
  let devLogger: DevLogger

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevLogger],
    }).compile()

    devLogger = module.get<DevLogger>(DevLogger)
  })

  it('should log a message', () => {
    const message = 'Test message'
    const logSpy = jest.spyOn(devLogger, 'log').mockImplementation(() => {})
    devLogger.log(message)
    expect(logSpy).toHaveBeenCalledWith(message)
  })

  it('should log an error', () => {
    const message = 'Test error'
    const errorSpy = jest.spyOn(devLogger, 'error').mockImplementation(() => {})
    devLogger.error(message)
    expect(errorSpy).toHaveBeenCalledWith(message)
  })

  it('should log a warning', () => {
    const message = 'Test warning'
    const warnSpy = jest.spyOn(devLogger, 'warn').mockImplementation(() => {})
    devLogger.warn(message)
    expect(warnSpy).toHaveBeenCalledWith(message)
  })
})
