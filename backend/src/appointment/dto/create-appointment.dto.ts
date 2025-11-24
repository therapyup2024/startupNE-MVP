import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from '../../entities/typeorm/appointment.entity';
import { IsDateString } from 'class-validator';

export class CreateAppointmentDto
  implements
    Omit<
      Appointment,
      | 'uid'
      | 'customer'
      | 'professional'
      | 'status'
      | 'updated_at'
      | 'created_at'
    >
{
  @ApiProperty({ description: 'Id de um produto existente' })
  product_id: number;

  @ApiProperty()
  customer_uid?: string;

  @ApiProperty()
  professional_uid?: string;

  @ApiProperty({ example: 'Primeira consulta' })
  title: string;

  @ApiProperty({ example: 'Consulta para avaliação inicial do cliente' })
  description?: string;

  @ApiProperty({ example: 'Nesta consulta vamos abordar assuntos iniciais' })
  notes?: string;

  @ApiProperty({ example: '2025-10-23 20:50:02' })
  @IsDateString()
  start_at: Date;

  @ApiProperty({ example: '2025-10-23 20:50:02' })
  @IsDateString()
  finish_at: Date;
}
