import Link from 'next/link';
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <nav style={{ width: '200px', background: '#f5f5f5', padding: '1rem' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>
          <Link href="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/admin/users">Users</Link>
        </li>
        {/* Add more admin links as needed */}
      </ul>
    </nav>
  );
};

export default Sidebar;
