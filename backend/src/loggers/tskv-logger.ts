import { LoggerService } from '@nestjs/common'

export class TskvLogger implements LoggerService {
  private formatMessage(level: string, message: any, ...optionalParams: any[]) {
    return `${level}\t${message}\t${optionalParams}\n`
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, ...optionalParams))
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, ...optionalParams))
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams))
  }
}
