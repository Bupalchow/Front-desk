import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Not } from 'typeorm'; // Add Not here
import { Appointment } from '../typeorm/entities/Appointment.entity';
import { Doctor } from '../typeorm/entities/Doctor.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';


@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: createAppointmentDto.doctorId }
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    if (!doctor.isAvailable) {
      throw new BadRequestException('Doctor is not available');
    }

    // Check for conflicting appointments
    const conflictingAppointment = await this.appointmentRepository.findOne({
      where: {
        doctor: { id: doctor.id },
        appointmentDate: createAppointmentDto.appointmentDate,
        status: 'booked'
      }
    });

    if (conflictingAppointment) {
      throw new BadRequestException('Time slot is already booked');
    }

    const appointment = this.appointmentRepository.create({
      patientName: createAppointmentDto.patientName,
      patientEmail: createAppointmentDto.patientEmail,
      appointmentDate: createAppointmentDto.appointmentDate,
      status: 'booked',
      doctor
    });

    return this.appointmentRepository.save(appointment);
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      relations: ['doctor'],
      order: { appointmentDate: 'ASC' }
    });
  }

  async getAppointmentById(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['doctor']
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }

  async updateAppointment(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.getAppointmentById(id);

    // Don't allow updating canceled appointments
    if (appointment.status === 'canceled') {
      throw new BadRequestException('Cannot update canceled appointment');
    }

    // If updating appointment date, check for conflicts
    if (updateAppointmentDto.appointmentDate) {
      const conflictingAppointment = await this.appointmentRepository.findOne({
        where: {
          doctor: { id: appointment.doctor.id },
          appointmentDate: updateAppointmentDto.appointmentDate,
          status: 'booked',
          id: Not(id) // Exclude current appointment
        }
      });

      if (conflictingAppointment) {
        throw new BadRequestException('Time slot is already booked');
      }
    }

    Object.assign(appointment, updateAppointmentDto);
    return this.appointmentRepository.save(appointment);
  }

  async cancelAppointment(id: number): Promise<Appointment> {
    const appointment = await this.getAppointmentById(id);

    if (appointment.status === 'canceled') {
      throw new BadRequestException('Appointment is already canceled');
    }

    if (appointment.status === 'completed') {
      throw new BadRequestException('Cannot cancel completed appointment');
    }

    appointment.status = 'canceled';
    return this.appointmentRepository.save(appointment);
  }

  async getDoctorAppointments(doctorId: number): Promise<Appointment[]> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId }
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return this.appointmentRepository.find({
      where: { doctor: { id: doctorId } },
      relations: ['doctor'],
      order: { appointmentDate: 'ASC' }
    });
  }

  async getTodayAppointments(): Promise<Appointment[]> {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    return this.appointmentRepository.find({
      where: {
        appointmentDate: Between(startOfDay, endOfDay),
        status: 'booked'
      },
      relations: ['doctor'],
      order: { appointmentDate: 'ASC' }
    });
  }

  async completeAppointment(id: number): Promise<Appointment> {
    const appointment = await this.getAppointmentById(id);

    if (appointment.status !== 'booked') {
      throw new BadRequestException(`Cannot complete ${appointment.status} appointment`);
    }

    appointment.status = 'completed';
    return this.appointmentRepository.save(appointment);
  }
}