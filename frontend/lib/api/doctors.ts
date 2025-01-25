import { API_BASE_URL } from '../config';
import { Doctor } from '@/types';

export const doctorsApi = {
  getAllDoctors: async (): Promise<Doctor[]> => {
    const res = await fetch(`${API_BASE_URL}/doctors`);
    if (!res.ok) throw new Error('Failed to fetch doctors');
    return res.json();
  },

  getDoctor: async (id: number): Promise<Doctor> => {
    const res = await fetch(`${API_BASE_URL}/doctors/${id}`);
    if (!res.ok) throw new Error('Failed to fetch doctor');
    return res.json();
  },

  createDoctor: async (data: Omit<Doctor, 'id'>): Promise<Doctor> => {
    const res = await fetch(`${API_BASE_URL}/doctors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create doctor');
    return res.json();
  },

  updateDoctor: async (id: number, data: Partial<Doctor>): Promise<Doctor> => {
    const res = await fetch(`${API_BASE_URL}/doctors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update doctor');
    return res.json();
  },

  deleteDoctor: async (id: number): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/doctors/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete doctor');
  },
};