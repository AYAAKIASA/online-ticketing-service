import React, { useEffect } from 'react';
import { fetchUserData } from '../services/api';

const MyComponent: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData('user_id_here');
        console.log('User data:', userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchData();
  }, []);

  return <div>My Component</div>;
};

export default MyComponent;
