import { useState, useEffect } from 'react';
import { queueApi } from '@/lib/api';
import { QueueEntry } from '@/types';
import QueueCard from './QueueCard';
import { MagnifyingGlassIcon as SearchIcon } from '@heroicons/react/24/outline';

export default function QueueList() {
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [newPatient, setNewPatient] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchQueue = async () => {
    try {
      const data = await queueApi.getQueue();
      setQueue(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch queue:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleAddToQueue = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await queueApi.addToQueue(newPatient);
      setNewPatient('');
      fetchQueue();
    } catch (error) {
      console.error('Failed to add to queue:', error);
    }
  };

  const handleStatusUpdate = async (id: number, status: 'waiting' | 'with_doctor' | 'completed') => {
    try {
      await queueApi.updateStatus(id, status);
      fetchQueue();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleRemove = async (id: number) => {
    try {
      await queueApi.removeFromQueue(id);
      fetchQueue();
    } catch (error) {
      console.error('Failed to remove from queue:', error);
    }
  };

  const filteredQueue = queue.filter(entry =>
    entry.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <form onSubmit={handleAddToQueue} className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={newPatient}
            onChange={(e) => setNewPatient(e.target.value)}
            placeholder="Enter patient name"
            className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
          >
            Add to Queue
          </button>
        </div>
      </form>

      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search patients..."
          className="w-full border-2 border-gray-200 rounded-lg p-3 pl-12 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
        />
        <SearchIcon className="h-6 w-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 mx-auto border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : filteredQueue.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No patients in queue
          </div>
        ) : (
          filteredQueue.map((entry) => (
            <QueueCard
              key={entry.id}
              entry={entry}
              onStatusUpdate={handleStatusUpdate}
              onRemove={handleRemove}
            />
          ))
        )}
      </div>
    </div>
  );
}