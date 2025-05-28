import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { configProvider } from './app.config.provider'
import { Films, Schedules } from './films/films.entity'
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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: configProvider.useValue.database.username,
      password: configProvider.useValue.database.password,
      database: 'film_react_nest',
      entities: [Films, Schedules],
      synchronize: false,
    }),
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
