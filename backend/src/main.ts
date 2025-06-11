import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import 'dotenv/config'
import { AppModule } from './app.module'
import { DevLogger } from './loggers/dev-logger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  })
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.setGlobalPrefix('api/afisha')
  app.enableCors()
  app.useLogger(new DevLogger())
  await app.listen(3000)
}
bootstrap()
