export class UpdateAppointmentDto {
    patientName?: string;
    patientEmail?: string;
    appointmentDate?: Date;
    status?: 'booked' | 'completed' | 'canceled';
  }