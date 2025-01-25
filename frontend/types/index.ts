export interface Doctor {
    id: number;
    name: string;
    specialization: string;
    gender: string;
    location: string;
    isAvailable: boolean;
    about?: string;
    rating?: number;
  }
  
  export interface Appointment {
    id: number;
    patientName: string;
    patientEmail: string;
    appointmentDate: Date;
    status: 'booked' | 'completed' | 'canceled';
    doctor: Doctor;
    doctorId: number;
  }
  
  export interface QueueEntry {
    id: number;
    patientName: string;
    queueNumber: number;
    status: 'waiting' | 'with_doctor' | 'completed';
    createdAt: Date;
  }