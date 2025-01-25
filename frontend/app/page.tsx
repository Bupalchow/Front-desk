'use client';
import QueueList from './components/queue/QueueList';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 animate-fade-in">
          Patient Queue Management
        </h1>
        <QueueList />
      </div>
    </div>
  );
}