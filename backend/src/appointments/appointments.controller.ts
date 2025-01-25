import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(createAppointmentDto);
  }

  @Get()
  getAllAppointments() {
    return this.appointmentsService.getAllAppointments();
  }

  @Get(':id')
  getAppointmentById(@Param('id') id: number) {
    return this.appointmentsService.getAppointmentById(id);
  }

  @Put(':id')
  updateAppointment(
    @Param('id') id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentsService.updateAppointment(id, updateAppointmentDto);
  }

  @Delete(':id')
  cancelAppointment(@Param('id') id: number) {
    return this.appointmentsService.cancelAppointment(id);
  }
}