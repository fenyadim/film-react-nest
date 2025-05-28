import { ConfigModule } from '@nestjs/config'

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    //TODO прочесть переменнные среды
    database: {
      driver: process.env.DATABASE_DRIVER,
      url: process.env.DATABASE_URL,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
  },
}

export interface AppConfig {
  database: AppConfigDatabase
}

export interface AppConfigDatabase {
  driver: string
  url: string
  username: string
  password: string
}
