import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from './Appointment.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  specialization: string;

  @Column()
  gender: string;

  @Column()
  location: string;

  @Column()
  isAvailable: boolean;

  @Column({ type: 'text', nullable: true })
  about: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  rating: number;

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];
}