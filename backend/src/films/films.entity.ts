import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn()
  id: string

  @Column({
    type: 'date',
  })
  daytime: Date

  @Column()
  hall: number

  @Column()
  rows: number

  @Column()
  seats: number

  @Column()
  price: number

  @Column()
  taken: string

  @ManyToOne(() => Films, (film) => film.id)
  film: string
}

@Entity()
export class Films {
  @PrimaryGeneratedColumn()
  id: string

  @Column({
    default: 0,
    type: 'float',
  })
  rating: number

  @Column()
  director: string

  @Column()
  tags: string

  @Column()
  image: string

  @Column()
  cover: string

  @Column({
    unique: true,
  })
  title: string

  @Column()
  about: string

  @Column()
  description: string

  @OneToMany(() => Schedules, (schedule) => schedule.film)
  schedule: Schedules[]
}
