import React from 'react';
import { FaDollarSign, FaFileInvoice, FaChartLine, FaIdCardAlt, FaEye } from 'react-icons/fa';

const Dashboard = () => {
  // Nested Card component for the financial summary
  const Card = ({ icon, title, value }) => (
    <div className='flex items-center p-6 bg-white rounded-lg shadow-sm'>
      <div className='mr-4 text-purple-600 text-2xl'>{icon}</div>
      <div>
        <div className='text-sm text-gray-500'>{title}</div>
        <div className='text-lg font-bold text-gray-800'>{value}</div>
      </div>
    </div>
  );

  // Nested ActivityItem component for the recent activity list
  const ActivityItem = ({ icon, title }) => (
    <div className='flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0'>
      <div className='flex items-center'>
        <div className='text-orange-500 text-xl mr-4'>{icon}</div>
        <div className='text-gray-700'>{title}</div>
      </div>
      <div className='text-sm text-gray-400'>Today</div>
    </div>
  );

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      {/* Financial Summary Section */}
      <h2 className='text-xl font-semibold mb-4 text-gray-800'>Financial Summary</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <Card
          icon={<FaDollarSign />}
          title='Annual Income'
          value='FCFA 500,000'
        />
        <Card
          icon={<FaFileInvoice />}
          title='Value of Land ownership'
          value='FCFA 2,000,010'
        />
        <Card
          icon={<FaChartLine />}
          title='Debt-to-Income Ratio'
          value='17/17'
        />
      </div>

      {/* Recent Activity Section */}
      <h2 className='text-xl font-semibold mb-4 text-gray-800'>Recent Activity</h2>
      <div className='bg-white rounded-lg shadow-sm'>
        <ActivityItem
          icon={<FaChartLine />}
          title='Credit score calculated'
        />
        <ActivityItem
          icon={<FaIdCardAlt />}
          title='Profile information submitted'
        />
        <ActivityItem
          icon={<FaEye />}
          title='Account created'
        />
      </div>
    </div>
  );
};

export default Dashboard;