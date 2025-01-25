import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { Doctor } from '../typeorm/entities/Doctor.entity';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  async createDoctor(@Body() doctorData: Partial<Doctor>): Promise<Doctor> {
    try {
      return await this.doctorsService.createDoctor(doctorData);
    } catch (error) {
      throw new Error(`Failed to create doctor: ${error.message}`);
    }
  }

  @Get()
  getAllDoctors() {
    return this.doctorsService.getAllDoctors();
  }

  @Get('search')
  searchDoctors(@Query() query: any) {
    return this.doctorsService.searchDoctors(query);
  }

  @Get(':id')
  getDoctorById(@Param('id') id: number) {
    return this.doctorsService.getDoctorById(id);
  }

  @Put(':id')
  updateDoctor(@Param('id') id: number, @Body() updateData: Partial<Doctor>) {
    return this.doctorsService.updateDoctor(id, updateData);
  }

  @Delete(':id')
  deleteDoctor(@Param('id') id: number) {
    return this.doctorsService.deleteDoctor(id);
  }
}