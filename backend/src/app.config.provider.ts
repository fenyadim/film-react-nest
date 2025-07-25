import { ConfigModule } from '@nestjs/config'

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: process.env.DATABASE_DRIVER,
      port: process.env.DATABASE_PORT,
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
  driver: 'postgres' | 'mongodb'
  port: string
  url: string
  username: string
  password: string
}
