'use client';

import { useState, useEffect } from 'react';
import { doctorsApi } from '@/lib/api/doctors';
import { Doctor } from '@/types';
import DoctorList from '../components/doctors/DoctorList';
import DoctorForm from '../components/doctors/DoctorForm';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const fetchDoctors = async () => {
    try {
      const data = await doctorsApi.getAllDoctors();
      setDoctors(data);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSubmit = async (data: Partial<Doctor>) => {
    try {
      if (editingDoctor) {
        await doctorsApi.updateDoctor(editingDoctor.id, data);
      } else {
        await doctorsApi.createDoctor(data as Omit<Doctor, 'id'>);
      }
      fetchDoctors();
      setShowForm(false);
      setEditingDoctor(null);
    } catch (error) {
      console.error('Failed to save doctor:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await doctorsApi.deleteDoctor(id);
        fetchDoctors();
      } catch (error) {
        console.error('Failed to delete doctor:', error);
      }
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setShowForm(true);
  };

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Doctors Management
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
          >
            Add Doctor
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search doctors by name or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
          />
          <svg className="absolute right-3 top-3 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-2xl transform transition-all duration-300 scale-100">
              <DoctorForm
                initialData={editingDoctor || undefined}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingDoctor(null);
                }}
              />
            </div>
          </div>
        )}

        <DoctorList
          doctors={filteredDoctors}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}