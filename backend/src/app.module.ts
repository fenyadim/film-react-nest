import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { configProvider } from './app.config.provider'
import { FilmsModule } from './films/films.module'
import { OrderModule } from './order/order.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    FilmsModule,
    OrderModule,
    MongooseModule.forRoot(configProvider.useValue.database.url),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
