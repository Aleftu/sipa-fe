import React from 'react';

interface ReportCardProps {
  title: string;
  description: string;
  status: 'Pending' | 'Processed' | 'Resolved';
}

const statusColors = {
  Pending: 'bg-yellow-500',
  Processed: 'bg-blue-500',
  Resolved: 'bg-green-500',
};

const ReportCard: React.FC<ReportCardProps> = ({ title, description, status }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md border-l-4" style={{ borderLeftColor: statusColors[status] }}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      <span className={`px-3 py-1 text-white text-sm rounded-md ${statusColors[status]}`}>
        {status}
      </span>
    </div>
  );
};

export default ReportCard;
