// import { useState } from 'react'
import rawData from './mocks/users.json';
import type { User } from './types/User';

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';

type UserResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
};

function App() {

  const data = rawData as UserResponse;
  const typedUsers = data.items;
  
  return (
    <>
      <ul>
        {typedUsers.map(user => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
    </>
  )
}

export default App
