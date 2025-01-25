import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Doctor } from './Doctor.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @Column()
  patientEmail: string;

  @Column({ type: 'datetime' })
  appointmentDate: Date;

  @Column()
  status: string; 

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Doctor, doctor => doctor.appointments)
  doctor: Doctor;
}