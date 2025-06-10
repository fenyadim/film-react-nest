import { TskvLogger } from './tskv-logger'

describe('TSKV logger', () => {
  let logger: TskvLogger

  beforeEach(() => {
    logger = new TskvLogger()
  })

  it('should be defined', () => {
    expect(logger).toBeDefined()
  })

  it('should format and log messages in TSKV format', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    const message = 'Test message'
    const params = ['param1', 'param2']

    logger.log(message, ...params)

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringMatching(/^log\tTest message\tparam1,param2\n$/),
    )
  })

  it('should format and log errors in TSKV format', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const message = 'Test error'
    const params = ['error1', 'error2']

    logger.error(message, ...params)

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringMatching(/^error\tTest error\terror1,error2\n$/),
    )
  })

  it('should format and log warnings in TSKV format', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const message = 'Test warning'
    const params = ['warning1', 'warning2']

    logger.warn(message, ...params)

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringMatching(/^warn\tTest warning\twarning1,warning2\n$/),
    )
  })

  it('should handle messages without optional parameters', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    const message = 'Test message'

    logger.log(message)

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringMatching(/^log\tTest message\t\n$/),
    )
  })
})
