import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from './appointment.entity';

export class AppointmentList {
  @ApiProperty({ type: [Appointment] })
  data: Appointment[];
}
