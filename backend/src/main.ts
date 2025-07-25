import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import 'dotenv/config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.setGlobalPrefix('api/afisha')
  app.enableCors()
  await app.listen(3000)
}
bootstrap()
