import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator'

import { Type } from 'class-transformer'

export class CreateOrderDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string

  @Type(() => Tickets)
  @ValidateNested({ each: true })
  tickets: Tickets[]
}

export class Tickets {
  @IsOptional()
  @IsUUID()
  id: string

  @IsNotEmpty()
  @IsString()
  film: string

  @IsNotEmpty()
  @IsString()
  session: string

  @IsNotEmpty()
  @IsString()
  daytime: string

  @IsNotEmpty()
  @IsNumber()
  row: number

  @IsNotEmpty()
  @IsNumber()
  seat: number

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsString()
  day: string

  @IsNotEmpty()
  @IsString()
  time: string
}
