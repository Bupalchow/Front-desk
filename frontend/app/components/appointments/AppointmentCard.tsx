import { Appointment } from '@/types';
import { format } from 'date-fns';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: (id: number) => void;
  onStatusUpdate: (id: number, status: 'completed' | 'canceled') => void;
}

export default function AppointmentCard({ appointment, onCancel, onStatusUpdate }: AppointmentCardProps) {
  const statusColors = {
    booked: 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200',
    canceled: 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200',
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-gray-800">{appointment.patientName}</h3>
          <p className="text-gray-600 text-sm">{appointment.patientEmail}</p>
        </div>
        <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${statusColors[appointment.status]} border`}>
          {appointment.status}
        </span>
      </div>
      
      <div className="space-y-3 mb-6">
        <p className="text-gray-700 flex items-center space-x-2">
          <span className="font-semibold">Doctor:</span>
          <span className="text-indigo-600">{appointment.doctor.name}</span>
        </p>
        <p className="text-gray-700 flex items-center space-x-2">
          <span className="font-semibold">Date:</span>
          <span>{format(new Date(appointment.appointmentDate), 'PPP p')}</span>
        </p>
      </div>

      {appointment.status === 'booked' && (
        <div className="flex space-x-3">
          <button
            onClick={() => onStatusUpdate(appointment.id, 'completed')}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg
                       hover:from-green-600 hover:to-green-700 transform hover:scale-[1.02] transition-all duration-200"
          >
            Complete
          </button>
          <button
            onClick={() => onCancel(appointment.id)}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg
                       hover:from-red-600 hover:to-red-700 transform hover:scale-[1.02] transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}