import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../typeorm/entities/Doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async createDoctor(doctorData: Partial<Doctor>): Promise<Doctor> {
    const doctor = this.doctorRepository.create(doctorData);
    return this.doctorRepository.save(doctor);
  }

  async getAllDoctors(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  async getDoctorById(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({ 
      where: { id },
      relations: ['appointments'] 
    });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async updateDoctor(id: number, updateData: Partial<Doctor>): Promise<Doctor> {
    const doctor = await this.getDoctorById(id);
    Object.assign(doctor, updateData);
    return this.doctorRepository.save(doctor);
  }

  async deleteDoctor(id: number): Promise<void> {
    const result = await this.doctorRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Doctor not found');
  }

  async searchDoctors(query: { specialization?: string; location?: string; isAvailable?: boolean }) {
    return this.doctorRepository.find({
      where: query
    });
  }
}