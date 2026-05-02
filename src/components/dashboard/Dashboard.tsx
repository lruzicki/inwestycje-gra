import React from 'react';
import NewsBanner from './NewsBanner';
import Charts from './Charts';

const Dashboard: React.FC = () => {
  return (
    <main className="flex-1 ml-80 mt-16 p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <NewsBanner />
        <Charts />
      </div>
    </main>
  );
};

export default Dashboard;
