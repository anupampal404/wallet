import React, { useEffect, useState } from 'react';

export const Balance = () => {
  const [value, setValue] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Define the async function
    const fetchBalance = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/account/balance', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.text();
        const balance = JSON.parse(data).balance;
        setValue(balance.toFixed(2));
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    // Call the async function
    fetchBalance();
  }, [token]); // Ensure the effect runs again if the token changes

  return (
    <div className="flex mt-2">
      <div className="font-bold text-lg">Your Balance</div>
      <div className="font-semibold ml-4 text-lg">Rs {value}</div>
    </div>
  );
};
