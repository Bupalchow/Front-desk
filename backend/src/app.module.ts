import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from './doctors/doctors.module';
import { QueueModule } from './queue/queue.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module'; // Add this
import { Doctor } from './typeorm/entities/Doctor.entity';
import { Appointment } from './typeorm/entities/Appointment.entity';
import { Queue } from './typeorm/entities/Queue.entity';
import { Staff } from './typeorm/entities/Staff.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '296122',
      database: 'medical_dashboard',
      entities: [Doctor, Appointment, Queue, Staff],
      synchronize: true,
    }),
    DoctorsModule,
    AppointmentsModule, // Add this
    QueueModule,
    AuthModule
  ],
})
export class AppModule {}