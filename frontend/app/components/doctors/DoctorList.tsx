import { Doctor } from '@/types';
import DoctorCard from './DoctorCard';

interface DoctorListProps {
  doctors: Doctor[];
  onEdit: (doctor: Doctor) => void;
  onDelete: (id: number) => void;
}

export default function DoctorList({ doctors, onEdit, onDelete }: DoctorListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}