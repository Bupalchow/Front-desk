import { QueueEntry } from '@/types';
import { motion } from 'framer-motion';

interface QueueCardProps {
  entry: QueueEntry;
  onStatusUpdate: (id: number, status: 'waiting' | 'with_doctor' | 'completed') => void;
  onRemove: (id: number) => void;
}

export default function QueueCard({ entry, onStatusUpdate, onRemove }: QueueCardProps) {
  const statusColors = {
    waiting: 'bg-yellow-100 text-yellow-800',
    with_doctor: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-500">Queue Number</span>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[entry.status]}`}>
              {entry.status.replace('_', ' ')}
            </div>
          </div>
          <h3 className="font-bold text-2xl text-gray-800">#{entry.queueNumber}</h3>
          <p className="text-lg text-gray-600">{entry.patientName}</p>
        </div>
        
        <div className="flex flex-col gap-3">
          <select
            value={entry.status}
            onChange={(e) => onStatusUpdate(entry.id, e.target.value as any)}
            className="w-full border-2 rounded-lg p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          >
            <option value="waiting">Waiting</option>
            <option value="with_doctor">With Doctor</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={() => onRemove(entry.id)}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200"
          >
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
}