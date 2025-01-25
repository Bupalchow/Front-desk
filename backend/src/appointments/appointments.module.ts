import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { Appointment } from '../typeorm/entities/Appointment.entity';
import { Doctor } from '../typeorm/entities/Doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Doctor])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService]
})
export class AppointmentsModule {}