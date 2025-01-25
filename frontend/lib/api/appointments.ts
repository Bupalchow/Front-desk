import { API_BASE_URL } from '../config';
import { Appointment } from '@/types';

export const appointmentsApi = {
  getAllAppointments: async (): Promise<Appointment[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to fetch appointments');
      }
      return res.json();
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  createAppointment: async (data: {
    patientName: string;
    patientEmail: string;
    appointmentDate: Date;
    doctorId: number;
  }): Promise<Appointment> => {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to create appointment');
      }
      
      return res.json();
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  updateAppointment: async (
    id: number,
    data: Partial<Appointment>
  ): Promise<Appointment> => {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to update appointment');
      }
      
      return res.json();
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  },

  cancelAppointment: async (id: number): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments/${id}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to cancel appointment');
      }
    } catch (error) {
      console.error('Error canceling appointment:', error);
      throw error;
    }
  },
};