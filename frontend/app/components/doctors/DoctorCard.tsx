import { Doctor } from '@/types';

interface DoctorCardProps {
  doctor: Doctor;
  onEdit: (doctor: Doctor) => void;
  onDelete: (id: number) => void;
}

export default function DoctorCard({ doctor, onEdit, onDelete }: DoctorCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-lg font-semibold">
                {doctor.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
              <p className="text-blue-600 font-medium">{doctor.specialization}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(doctor)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(doctor.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-gray-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{doctor.location}</span>
        </div>

        <div className="flex items-center">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            doctor.isAvailable 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {doctor.isAvailable ? 'Available' : 'Not Available'}
          </span>
        </div>

        {doctor.about && (
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">{doctor.about}</p>
        )}
      </div>
    </div>
  );
}