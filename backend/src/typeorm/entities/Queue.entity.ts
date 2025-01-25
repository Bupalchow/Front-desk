import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @Column()
  queueNumber: number;

  @Column({
    type: 'enum',
    enum: ['waiting', 'with_doctor', 'completed'],
    default: 'waiting'
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}