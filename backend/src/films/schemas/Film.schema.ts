import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
class Schedule {
  @Prop({ unique: true })
  id: string

  @Prop({ type: Date, required: true })
  daytime: Date

  @Prop({ required: true })
  hall: number

  @Prop({ required: true })
  rows: number

  @Prop({ required: true })
  seats: number

  @Prop({ required: true })
  price: number

  @Prop()
  taken: string[]
}

const ScheduleSchema = SchemaFactory.createForClass(Schedule)

@Schema()
export class Film {
  @Prop({ unique: true })
  id: string

  @Prop({ required: true, default: 0 })
  rating: number

  @Prop({ required: true })
  director: string

  @Prop({ type: [String], required: true })
  tags: string[]

  @Prop({ required: true })
  image: string

  @Prop({ required: true })
  cover: string

  @Prop({ required: true, unique: true })
  title: string

  @Prop({ required: true })
  about: string

  @Prop({ required: true })
  description: string

  @Prop({ type: [ScheduleSchema] })
  schedule: Schedule[]
}

export const FilmSchema = SchemaFactory.createForClass(Film)
