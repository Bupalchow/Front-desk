'use client';

import { useState } from 'react';
import { Doctor } from '@/types';
import { appointmentsApi } from '@/lib/api/appointments';

interface AppointmentFormProps {
  doctors: Doctor[];
  onSuccess: () => void;
}

export default function AppointmentForm({ doctors, onSuccess }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    appointmentDate: '',
    doctorId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await appointmentsApi.createAppointment({
        ...formData,
        doctorId: parseInt(formData.doctorId),
        appointmentDate: new Date(formData.appointmentDate),
      });
      onSuccess();
      setFormData({
        patientName: '',
        patientEmail: '',
        appointmentDate: '',
        doctorId: '',
      });
    } catch (error) {
      console.error('Failed to create appointment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 transform transition-all duration-300 ease-in-out">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Patient Name</label>
          <input
            type="text"
            value={formData.patientName}
            onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 ease-in-out"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Patient Email</label>
          <input
            type="email"
            value={formData.patientEmail}
            onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 ease-in-out"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Doctor</label>
          <select
            value={formData.doctorId}
            onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 ease-in-out"
            required
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Appointment Date</label>
          <input
            type="datetime-local"
            value={formData.appointmentDate}
            onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 ease-in-out"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-lg
                   hover:from-indigo-700 hover:to-indigo-800 transform hover:scale-[1.02] transition-all duration-200
                   shadow-md hover:shadow-lg font-medium text-lg"
      >
        Create Appointment
      </button>
    </form>
  );
}