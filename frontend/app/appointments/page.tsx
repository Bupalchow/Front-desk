'use client';

import { useState, useEffect } from 'react';
import { appointmentsApi } from '@/lib/api/appointments';
import { doctorsApi } from '@/lib/api/doctors';
import { Appointment, Doctor } from '@/types';
import AppointmentCard from '@/app/components/appointments/AppointmentCard';
import AppointmentForm from '@/app/components/appointments/AppointmentForm';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [showForm, setShowForm] = useState(false);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentsApi.getAllAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const data = await doctorsApi.getAllDoctors();
      setDoctors(data);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const handleCancel = async (id: number) => {
    try {
      await appointmentsApi.cancelAppointment(id);
      fetchAppointments();
    } catch (error) {
      console.error('Failed to cancel appointment:', error);
    }
  };

  const handleStatusUpdate = async (id: number, status: 'completed' | 'canceled') => {
    try {
      await appointmentsApi.updateAppointment(id, { status });
      fetchAppointments();
    } catch (error) {
      console.error('Failed to update appointment status:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
          Appointments
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-2.5 rounded-lg
                     hover:from-indigo-700 hover:to-indigo-800 transform hover:scale-[1.02] transition-all duration-200
                     shadow-md hover:shadow-lg font-medium"
        >
          {showForm ? 'Hide Form' : 'New Appointment'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Appointment</h2>
          <AppointmentForm
            doctors={doctors}
            onSuccess={() => {
              fetchAppointments();
              setShowForm(false);
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment, index) => (
          <div
            key={appointment.id}
            className="transform transition-all duration-300 ease-in-out"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <AppointmentCard
              appointment={appointment}
              onCancel={handleCancel}
              onStatusUpdate={handleStatusUpdate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}