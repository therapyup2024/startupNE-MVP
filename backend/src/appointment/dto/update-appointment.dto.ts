import { ApiProperty } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsDateString } from 'class-validator';

export class UpdateAppointmentDto
  implements Omit<CreateAppointmentDto, 'product_id'>
{
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
