import { API_BASE_URL } from '../config';
import { QueueEntry } from '@/types';

export const queueApi = {
  // Get current queue
  getQueue: async (): Promise<QueueEntry[]> => {
    const res = await fetch(`${API_BASE_URL}/queue`);
    if (!res.ok) throw new Error('Failed to fetch queue');
    return res.json();
  },

  // Add patient to queue
  addToQueue: async (patientName: string): Promise<QueueEntry> => {
    const res = await fetch(`${API_BASE_URL}/queue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientName }),
    });
    if (!res.ok) throw new Error('Failed to add to queue');
    return res.json();
  },

  // Update queue status
  updateStatus: async (
    id: number,
    status: 'waiting' | 'with_doctor' | 'completed'
  ): Promise<QueueEntry> => {
    const res = await fetch(`${API_BASE_URL}/queue/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
  },

  // Remove from queue
  removeFromQueue: async (id: number): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/queue/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to remove from queue');
  },
};