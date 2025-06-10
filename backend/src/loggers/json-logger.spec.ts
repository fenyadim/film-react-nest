import { JsonLogger } from './json-logger'

describe('JSON logger', () => {
  let logger: JsonLogger

  beforeEach(async () => {
    logger = new JsonLogger()
  })

  it('should log messages in JSON format', () => {
    const message = 'Test message'
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    logger.log(message)
    const expectMessage = JSON.stringify({
      level: 'log',
      message,
      optionalParams: [],
    })
    expect(logSpy).toHaveBeenCalledWith(expectMessage)
  })

  it('should log errors in JSON format', () => {
    const message = 'Test error'
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    logger.error(message)
    const expectMessage = JSON.stringify({
      level: 'error',
      message,
      optionalParams: [],
    })
    expect(errorSpy).toHaveBeenCalledWith(expectMessage)
  })

  it('should log warnings in JSON format', () => {
    const message = 'Test warning'
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    logger.warn(message)
    const expectMessage = JSON.stringify({
      level: 'warn',
      message,
      optionalParams: [],
    })
    expect(warnSpy).toHaveBeenCalledWith(expectMessage)
  })

  it('should handle complex objects in optional parameters', () => {
    const message = 'Test message'
    const complexObject = { key: 'value', nested: { array: [1, 2, 3] } }
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    logger.log(message, complexObject)

    const expectMessage = JSON.stringify({
      level: 'log',
      message,
      optionalParams: [complexObject],
    })

    expect(logSpy).toHaveBeenCalledWith(expectMessage)
  })
})
