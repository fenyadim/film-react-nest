import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FilmsController } from './films.controller'
import { Films } from './films.entity'
import { FilmsService } from './films.service'

@Module({
  imports: [TypeOrmModule.forFeature([Films])],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
